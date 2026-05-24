#import "NativeScriptUIView.h"

static UIView* NativeScriptUIViewFromHandle(NSString* handle) {
  if (handle == nil || handle.length == 0) {
    return nil;
  }

  const char* text = handle.UTF8String;
  if (text == nullptr || text[0] == '\0') {
    return nil;
  }

  char* end = nullptr;
  unsigned long long address = strtoull(text, &end, 0);
  if (address == 0 || end == text || (end != nullptr && *end != '\0')) {
    return nil;
  }

  id object = reinterpret_cast<id>(static_cast<uintptr_t>(address));
  if (object == nil || ![object isKindOfClass:UIView.class]) {
    return nil;
  }

  return static_cast<UIView*>(object);
}

@implementation NativeScriptUIView {
  UIView* _nativeView;
}

- (void)dealloc {
  [_nativeView removeFromSuperview];
  [_nativeView release];
  [_nativeViewHandle release];
  [super dealloc];
}

- (void)setNativeViewHandle:(NSString*)nativeViewHandle {
  if ((_nativeViewHandle == nativeViewHandle) ||
      [_nativeViewHandle isEqualToString:nativeViewHandle]) {
    return;
  }

  [_nativeViewHandle release];
  _nativeViewHandle = [nativeViewHandle copy];
  [self setNativeView:NativeScriptUIViewFromHandle(_nativeViewHandle)];
}

- (void)setNativeView:(UIView*)nativeView {
  if (_nativeView == nativeView) {
    return;
  }

  [_nativeView removeFromSuperview];
  [_nativeView release];
  _nativeView = nil;

  if (nativeView == nil) {
    return;
  }

  _nativeView = [nativeView retain];
  [_nativeView removeFromSuperview];
  _nativeView.frame = self.bounds;
  _nativeView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
  [self addSubview:_nativeView];
  [self setNeedsLayout];
}

- (void)layoutSubviews {
  [super layoutSubviews];
  _nativeView.frame = self.bounds;
}

@end
