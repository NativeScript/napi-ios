//  Message.cpp
//  NativeScript
//
//  Created by Eduardo Speroni on 11/22/23.
//  Copyright © 2023 Progress. All rights reserved.

#ifndef TARGET_ENGINE_V8

#include "js_native_api.h"
#include "MessageJSON.h"

namespace nativescript {

#include <assert.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

typedef enum {
  TYPE_UNDEFINED = 0x00,
  TYPE_NULL = 0x01,
  TYPE_BOOLEAN = 0x02,
  TYPE_NUMBER = 0x03,
  TYPE_STRING = 0x04,
  TYPE_ARRAY = 0x05,
  TYPE_OBJECT = 0x06,
  TYPE_DATE = 0x07,
  TYPE_ARRAYBUFFER = 0x08
} TypeTag;

#define CHECK(expr)              \
  do {                           \
    napi_status status = (expr); \
    assert(status == napi_ok);   \
  } while (0)

typedef struct {
  uint8_t* data;
  size_t size;
  size_t capacity;
} Buffer;

#define INITIAL_CAPACITY 1024

static void buffer_init(Buffer* buf) {
  buf->data = (uint8_t*)malloc(INITIAL_CAPACITY);
  buf->size = 0;
  buf->capacity = INITIAL_CAPACITY;
}

static void buffer_free(Buffer* buf) {
  if (buf->data != NULL) {
    free(buf->data);
    buf->data = NULL;
  }
  buf->size = 0;
  buf->capacity = 0;
}

static void buffer_ensure_capacity(Buffer* buf, size_t additional) {
  while (buf->size + additional > buf->capacity) {
    buf->capacity *= 2;
    buf->data = (uint8_t*)realloc(buf->data, buf->capacity);
  }
}

static void buffer_write(Buffer* buf, const void* src, size_t len) {
  buffer_ensure_capacity(buf, len);
  memcpy(buf->data + buf->size, src, len);
  buf->size += len;
}

static void write_uint32(Buffer* buf, uint32_t val) {
  buffer_write(buf, &val, 4);
}

static void write_double(Buffer* buf, double val) {
  buffer_write(buf, &val, 8);
}

static void write_string(napi_env env, Buffer* buf, napi_value str) {
  size_t len;
  CHECK(napi_get_value_string_utf8(env, str, NULL, 0, &len));
  write_uint32(buf, (uint32_t)len);
  buffer_ensure_capacity(buf, len);
  CHECK(napi_get_value_string_utf8(env, str, (char*)(buf->data + buf->size),
                                   len + 1, NULL));
  buf->size += len;
}

static uint32_t read_uint32(const uint8_t** buf) {
  uint32_t val = 0;
  for (int i = 0; i < 4; ++i) val |= (uint32_t)(*(*buf)++) << (i * 8);
  return val;
}

static void write_double(uint8_t** buf, double val) {
  memcpy(*buf, &val, 8);
  *buf += 8;
}

static double read_double(const uint8_t** buf) {
  double val;
  memcpy(&val, *buf, 8);
  *buf += 8;
  return val;
}

static napi_value read_string(napi_env env, const uint8_t** buf) {
  uint32_t len = read_uint32(buf);
  napi_value result;
  CHECK(napi_create_string_utf8(env, (const char*)(*buf), len, &result));
  *buf += len;
  return result;
}

static napi_value deserialize(napi_env env, const uint8_t** buf) {
  uint8_t tag = *(*buf)++;
  napi_value result;

  switch ((TypeTag)tag) {
    case TYPE_UNDEFINED:
      CHECK(napi_get_undefined(env, &result));
      break;
    case TYPE_NULL:
      CHECK(napi_get_null(env, &result));
      break;
    case TYPE_BOOLEAN: {
      bool b = *(*buf)++ != 0;
      CHECK(napi_get_boolean(env, b, &result));
      break;
    }
    case TYPE_NUMBER: {
      double num = read_double(buf);
      CHECK(napi_create_double(env, num, &result));
      break;
    }
    case TYPE_STRING:
      result = read_string(env, buf);
      break;
    case TYPE_ARRAY: {
      uint32_t len = read_uint32(buf);
      CHECK(napi_create_array_with_length(env, len, &result));
      for (uint32_t i = 0; i < len; ++i) {
        napi_value elem = deserialize(env, buf);
        CHECK(napi_set_element(env, result, i, elem));
      }
      break;
    }
    case TYPE_OBJECT: {
      CHECK(napi_create_object(env, &result));
      uint32_t len = read_uint32(buf);
      for (uint32_t i = 0; i < len; ++i) {
        napi_value key = read_string(env, buf);
        napi_value val = deserialize(env, buf);
        CHECK(napi_set_property(env, result, key, val));
      }
      break;
    }
    case TYPE_DATE: {
      double t = read_double(buf);
      CHECK(napi_create_date(env, t, &result));
      break;
    }
    default:
      assert(0 && "Unknown tag");
  }
  return result;
}

static void serialize(napi_env env, napi_value val, Buffer* buf) {
  napi_valuetype type;
  CHECK(napi_typeof(env, val, &type));

  uint8_t tag;

  if (type == napi_undefined) {
    tag = TYPE_UNDEFINED;
    buffer_write(buf, &tag, 1);
  } else if (type == napi_null) {
    tag = TYPE_NULL;
    buffer_write(buf, &tag, 1);
  } else if (type == napi_boolean) {
    tag = TYPE_BOOLEAN;
    buffer_write(buf, &tag, 1);
    bool b;
    CHECK(napi_get_value_bool(env, val, &b));
    uint8_t bv = b ? 1 : 0;
    buffer_write(buf, &bv, 1);
  } else if (type == napi_number) {
    tag = TYPE_NUMBER;
    buffer_write(buf, &tag, 1);
    double num;
    CHECK(napi_get_value_double(env, val, &num));
    write_double(buf, num);
  } else if (type == napi_string) {
    tag = TYPE_STRING;
    buffer_write(buf, &tag, 1);
    write_string(env, buf, val);
  } else {
    bool is_array;
    CHECK(napi_is_array(env, val, &is_array));
    if (is_array) {
      tag = TYPE_ARRAY;
      buffer_write(buf, &tag, 1);
      uint32_t len;
      CHECK(napi_get_array_length(env, val, &len));
      write_uint32(buf, len);
      for (uint32_t i = 0; i < len; ++i) {
        napi_value elem;
        CHECK(napi_get_element(env, val, i, &elem));
        serialize(env, elem, buf);
      }
    } else {
      napi_value ctor;
      CHECK(napi_get_named_property(env, val, "constructor", &ctor));
      napi_value ctor_name;
      CHECK(napi_get_named_property(env, ctor, "name", &ctor_name));

      size_t len;
      char cname[32];
      CHECK(napi_get_value_string_utf8(env, ctor_name, cname, sizeof(cname),
                                       &len));

      if (strcmp(cname, "Date") == 0) {
        tag = TYPE_DATE;
        buffer_write(buf, &tag, 1);
        napi_value time;
        CHECK(napi_coerce_to_number(env, val, &time));
        double t;
        CHECK(napi_get_value_double(env, time, &t));
        write_double(buf, t);
      } else {
        tag = TYPE_OBJECT;
        buffer_write(buf, &tag, 1);
        napi_value keys;
        CHECK(napi_get_property_names(env, val, &keys));
        uint32_t len;
        CHECK(napi_get_array_length(env, keys, &len));
        write_uint32(buf, len);
        for (uint32_t i = 0; i < len; ++i) {
          napi_value key, value;
          CHECK(napi_get_element(env, keys, i, &key));
          write_string(env, buf, key);
          CHECK(napi_get_property(env, val, key, &value));
          serialize(env, value, buf);
        }
      }
    }
  }
}

namespace worker {

bool Message::Serialize(napi_env env, napi_value input) {
  Buffer buf;
  buffer_init(&buf);
  serialize(env, input, &buf);
  main_message_buf_ = MallocedBuffer<char>((char*)buf.data, buf.size);
  return true;
}

napi_value Message::Deserialize(napi_env env) {
  const uint8_t* buf = (const uint8_t*)main_message_buf_.data;
  return deserialize(env, &buf);
}

Message::Message(MallocedBuffer<char>&& payload)
    : main_message_buf_(std::move(payload)) {}
};  // namespace worker
};  // namespace nativescript

#endif  // TARGET_ENGINE_V8
