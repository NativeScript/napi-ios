/// <reference types="@nativescript/objc-node-api" />

declare const clk_sampler_type: {
  __CLK_ADDRESS_BASE: 0,
  CLK_ADDRESS_NONE: 0,
  CLK_ADDRESS_CLAMP: 1,
  CLK_ADDRESS_CLAMP_TO_EDGE: 2,
  CLK_ADDRESS_REPEAT: 3,
  CLK_ADDRESS_MIRRORED_REPEAT: 4,
  __CLK_ADDRESS_MASK: 7,
  __CLK_ADDRESS_BITS: 3,
  __CLK_NORMALIZED_BASE: 3,
  CLK_NORMALIZED_COORDS_FALSE: 0,
  CLK_NORMALIZED_COORDS_TRUE: 8,
  __CLK_NORMALIZED_MASK: 8,
  __CLK_NORMALIZED_BITS: 1,
  __CLK_FILTER_BASE: 4,
  CLK_FILTER_NEAREST: 0,
  CLK_FILTER_LINEAR: 16,
  __CLK_FILTER_MASK: 16,
  __CLK_FILTER_BITS: 2,
};

declare class _cl_dag {
  constructor(init?: _cl_dag);
}

declare class _cl_buffer_region {
  constructor(init?: _cl_buffer_region);
  origin: number;
  size: number;
}

declare class _cl_image_desc {
  constructor(init?: _cl_image_desc);
  image_type: number;
  image_width: number;
  image_height: number;
  image_depth: number;
  image_array_size: number;
  image_row_pitch: number;
  image_slice_pitch: number;
  num_mip_levels: number;
  num_samples: number;
  buffer: interop.Pointer;
}

declare class _cl_event {
  constructor(init?: _cl_event);
}

declare class _cl_command_queue {
  constructor(init?: _cl_command_queue);
}

declare class unnamed_3384217995241409524 {
  constructor(init?: unnamed_3384217995241409524);
  lo: cl_double8;
  hi: cl_double8;
}

declare class unnamed_10075698169940300385 {
  constructor(init?: unnamed_10075698169940300385);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_1487096924336279358 {
  constructor(init?: unnamed_1487096924336279358);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_17916113464289890500 {
  constructor(init?: unnamed_17916113464289890500);
  s0: number;
  s1: number;
}

declare class unnamed_10452921887961483967 {
  constructor(init?: unnamed_10452921887961483967);
  lo: cl_float8;
  hi: cl_float8;
}

declare class unnamed_4265872420881341375 {
  constructor(init?: unnamed_4265872420881341375);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
  s8: number;
  s9: number;
  sA: number;
  sB: number;
  sC: number;
  sD: number;
  sE: number;
  sF: number;
}

declare class unnamed_4375177653692867402 {
  constructor(init?: unnamed_4375177653692867402);
  x: number;
  y: number;
  z: number;
  w: number;
  __spacer4: number;
  __spacer5: number;
  __spacer6: number;
  __spacer7: number;
  __spacer8: number;
  __spacer9: number;
  sa: number;
  sb: number;
  sc: number;
  sd: number;
  se: number;
  sf: number;
}

declare class unnamed_3951090377487620185 {
  constructor(init?: unnamed_3951090377487620185);
  lo: cl_float4;
  hi: cl_float4;
}

declare class unnamed_11128493026031761872 {
  constructor(init?: unnamed_11128493026031761872);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_9460502415089137320 {
  constructor(init?: unnamed_9460502415089137320);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_5711417867074854471 {
  constructor(init?: unnamed_5711417867074854471);
  lo: number;
  hi: number;
}

declare class unnamed_10189424661010001568 {
  constructor(init?: unnamed_10189424661010001568);
  s0: number;
  s1: number;
}

declare class unnamed_4948529187926790050 {
  constructor(init?: unnamed_4948529187926790050);
  x: number;
  y: number;
  z: number;
  w: number;
  __spacer4: number;
  __spacer5: number;
  __spacer6: number;
  __spacer7: number;
  __spacer8: number;
  __spacer9: number;
  sa: number;
  sb: number;
  sc: number;
  sd: number;
  se: number;
  sf: number;
}

declare class unnamed_15794953310966416195 {
  constructor(init?: unnamed_15794953310966416195);
  lo: cl_ulong4;
  hi: cl_ulong4;
}

declare class unnamed_11747182226146023338 {
  constructor(init?: unnamed_11747182226146023338);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_12467758043249578531 {
  constructor(init?: unnamed_12467758043249578531);
  lo: cl_ulong2;
  hi: cl_ulong2;
}

declare class unnamed_157298104481405609 {
  constructor(init?: unnamed_157298104481405609);
  lo: cl_long8;
  hi: cl_long8;
}

declare class unnamed_14826148865455445890 {
  constructor(init?: unnamed_14826148865455445890);
  x: number;
  y: number;
  z: number;
  w: number;
  __spacer4: number;
  __spacer5: number;
  __spacer6: number;
  __spacer7: number;
  __spacer8: number;
  __spacer9: number;
  sa: number;
  sb: number;
  sc: number;
  sd: number;
  se: number;
  sf: number;
}

declare class unnamed_16534046582714501500 {
  constructor(init?: unnamed_16534046582714501500);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_1928208705536956950 {
  constructor(init?: unnamed_1928208705536956950);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_14351621013282865903 {
  constructor(init?: unnamed_14351621013282865903);
  s0: number;
  s1: number;
}

declare class unnamed_17179882819924420600 {
  constructor(init?: unnamed_17179882819924420600);
  x: number;
  y: number;
}

declare class unnamed_11932633045031876193 {
  constructor(init?: unnamed_11932633045031876193);
  lo: cl_uint8;
  hi: cl_uint8;
}

declare class unnamed_18068353447637168682 {
  constructor(init?: unnamed_18068353447637168682);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
  s8: number;
  s9: number;
  sA: number;
  sB: number;
  sC: number;
  sD: number;
  sE: number;
  sF: number;
}

declare class unnamed_15782319874853990514 {
  constructor(init?: unnamed_15782319874853990514);
  x: number;
  y: number;
  z: number;
  w: number;
  __spacer4: number;
  __spacer5: number;
  __spacer6: number;
  __spacer7: number;
  __spacer8: number;
  __spacer9: number;
  sa: number;
  sb: number;
  sc: number;
  sd: number;
  se: number;
  sf: number;
}

declare class unnamed_13472826477927789743 {
  constructor(init?: unnamed_13472826477927789743);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_17804257352245573197 {
  constructor(init?: unnamed_17804257352245573197);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_11692550308387624276 {
  constructor(init?: unnamed_11692550308387624276);
  lo: number;
  hi: number;
}

declare class unnamed_10875463678178951979 {
  constructor(init?: unnamed_10875463678178951979);
  x: number;
  y: number;
}

declare class unnamed_1912165358789006771 {
  constructor(init?: unnamed_1912165358789006771);
  lo: cl_int4;
  hi: cl_int4;
}

declare class unnamed_14741079727055866135 {
  constructor(init?: unnamed_14741079727055866135);
  lo: cl_int2;
  hi: cl_int2;
}

declare class unnamed_11015101876155846343 {
  constructor(init?: unnamed_11015101876155846343);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_10714372094052795385 {
  constructor(init?: unnamed_10714372094052795385);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_6061416245719678494 {
  constructor(init?: unnamed_6061416245719678494);
  lo: number;
  hi: number;
}

declare class unnamed_16175095162510523254 {
  constructor(init?: unnamed_16175095162510523254);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_11431299934465012507 {
  constructor(init?: unnamed_11431299934465012507);
  lo: cl_ushort2;
  hi: cl_ushort2;
}

declare class unnamed_37027789258998962 {
  constructor(init?: unnamed_37027789258998962);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_11728641542996814287 {
  constructor(init?: unnamed_11728641542996814287);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
  s8: number;
  s9: number;
  sA: number;
  sB: number;
  sC: number;
  sD: number;
  sE: number;
  sF: number;
}

declare class unnamed_15270323389585556263 {
  constructor(init?: unnamed_15270323389585556263);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_16748556713609542478 {
  constructor(init?: unnamed_16748556713609542478);
  lo: cl_short2;
  hi: cl_short2;
}

declare class unnamed_10262120028975896883 {
  constructor(init?: unnamed_10262120028975896883);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_16297725364147337596 {
  constructor(init?: unnamed_16297725364147337596);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_12807319024543346599 {
  constructor(init?: unnamed_12807319024543346599);
  lo: number;
  hi: number;
}

declare class unnamed_6893033831670583988 {
  constructor(init?: unnamed_6893033831670583988);
  s0: number;
  s1: number;
}

declare class unnamed_9230305257605907363 {
  constructor(init?: unnamed_9230305257605907363);
  x: number;
  y: number;
}

declare class unnamed_14008731696207659668 {
  constructor(init?: unnamed_14008731696207659668);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
  s8: number;
  s9: number;
  sA: number;
  sB: number;
  sC: number;
  sD: number;
  sE: number;
  sF: number;
}

declare class unnamed_10302458957594651158 {
  constructor(init?: unnamed_10302458957594651158);
  lo: cl_uchar4;
  hi: cl_uchar4;
}

declare class unnamed_3184464211421284931 {
  constructor(init?: unnamed_3184464211421284931);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_4314393786622110517 {
  constructor(init?: unnamed_4314393786622110517);
  lo: cl_char8;
  hi: cl_char8;
}

declare class unnamed_6890114919233052243 {
  constructor(init?: unnamed_6890114919233052243);
  lo: cl_char4;
  hi: cl_char4;
}

declare class unnamed_9069934110533823967 {
  constructor(init?: unnamed_9069934110533823967);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_6866413762664061019 {
  constructor(init?: unnamed_6866413762664061019);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_97391304474044721 {
  constructor(init?: unnamed_97391304474044721);
  s0: number;
  s1: number;
}

declare class unnamed_9150435229609773826 {
  constructor(init?: unnamed_9150435229609773826);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_3947849111994773202 {
  constructor(init?: unnamed_3947849111994773202);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_16956709262785277280 {
  constructor(init?: unnamed_16956709262785277280);
  x: number;
  y: number;
}

declare class unnamed_16184349839104627448 {
  constructor(init?: unnamed_16184349839104627448);
  x: number;
  y: number;
}

declare class unnamed_555892314822413329 {
  constructor(init?: unnamed_555892314822413329);
  lo: number;
  hi: number;
}

declare class unnamed_194442836655258556 {
  constructor(init?: unnamed_194442836655258556);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
  s8: number;
  s9: number;
  sA: number;
  sB: number;
  sC: number;
  sD: number;
  sE: number;
  sF: number;
}

declare class unnamed_11508907125777683973 {
  constructor(init?: unnamed_11508907125777683973);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class _cl_image_format {
  constructor(init?: _cl_image_format);
  image_channel_order: number;
  image_channel_data_type: number;
}

declare class _cl_ndrange {
  constructor(init?: _cl_ndrange);
  work_dim: number;
  global_work_offset: unknown /* const array */;
  global_work_size: unknown /* const array */;
  local_work_size: unknown /* const array */;
}

declare class unnamed_12411578003359084094 {
  constructor(init?: unnamed_12411578003359084094);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_11964066516897993654 {
  constructor(init?: unnamed_11964066516897993654);
  lo: cl_long2;
  hi: cl_long2;
}

declare class unnamed_8748670721906742408 {
  constructor(init?: unnamed_8748670721906742408);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
  s8: number;
  s9: number;
  sA: number;
  sB: number;
  sC: number;
  sD: number;
  sE: number;
  sF: number;
}

declare class unnamed_13231383001259203263 {
  constructor(init?: unnamed_13231383001259203263);
  lo: cl_uchar2;
  hi: cl_uchar2;
}

declare class unnamed_12211959722025922171 {
  constructor(init?: unnamed_12211959722025922171);
  lo: number;
  hi: number;
}

declare class unnamed_16770986038177360195 {
  constructor(init?: unnamed_16770986038177360195);
  lo: cl_short4;
  hi: cl_short4;
}

declare class _cl_program {
  constructor(init?: _cl_program);
}

declare class unnamed_4207023800260751375 {
  constructor(init?: unnamed_4207023800260751375);
  s0: number;
  s1: number;
}

declare class unnamed_5567254350586322420 {
  constructor(init?: unnamed_5567254350586322420);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
  s8: number;
  s9: number;
  sA: number;
  sB: number;
  sC: number;
  sD: number;
  sE: number;
  sF: number;
}

declare class unnamed_10303716954420111258 {
  constructor(init?: unnamed_10303716954420111258);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_13386671362320546895 {
  constructor(init?: unnamed_13386671362320546895);
  x: number;
  y: number;
}

declare class unnamed_772419599995069687 {
  constructor(init?: unnamed_772419599995069687);
  x: number;
  y: number;
  z: number;
  w: number;
  __spacer4: number;
  __spacer5: number;
  __spacer6: number;
  __spacer7: number;
  __spacer8: number;
  __spacer9: number;
  sa: number;
  sb: number;
  sc: number;
  sd: number;
  se: number;
  sf: number;
}

declare class unnamed_17781229732302822053 {
  constructor(init?: unnamed_17781229732302822053);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_13183432563966936686 {
  constructor(init?: unnamed_13183432563966936686);
  x: number;
  y: number;
  z: number;
  w: number;
  __spacer4: number;
  __spacer5: number;
  __spacer6: number;
  __spacer7: number;
  __spacer8: number;
  __spacer9: number;
  sa: number;
  sb: number;
  sc: number;
  sd: number;
  se: number;
  sf: number;
}

declare class unnamed_5330709934686461026 {
  constructor(init?: unnamed_5330709934686461026);
  x: number;
  y: number;
  z: number;
  w: number;
  __spacer4: number;
  __spacer5: number;
  __spacer6: number;
  __spacer7: number;
  __spacer8: number;
  __spacer9: number;
  sa: number;
  sb: number;
  sc: number;
  sd: number;
  se: number;
  sf: number;
}

declare class unnamed_4803235281582364344 {
  constructor(init?: unnamed_4803235281582364344);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_5862795029955144721 {
  constructor(init?: unnamed_5862795029955144721);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_16840043814704548474 {
  constructor(init?: unnamed_16840043814704548474);
  lo: number;
  hi: number;
}

declare class unnamed_2236783618833938177 {
  constructor(init?: unnamed_2236783618833938177);
  lo: cl_ushort4;
  hi: cl_ushort4;
}

declare class unnamed_9678992148274389456 {
  constructor(init?: unnamed_9678992148274389456);
  lo: number;
  hi: number;
}

declare class unnamed_7625645434287248923 {
  constructor(init?: unnamed_7625645434287248923);
  lo: cl_ushort8;
  hi: cl_ushort8;
}

declare class unnamed_6196611363029610707 {
  constructor(init?: unnamed_6196611363029610707);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_12166987235307106462 {
  constructor(init?: unnamed_12166987235307106462);
  lo: cl_uchar8;
  hi: cl_uchar8;
}

declare class _cl_mem {
  constructor(init?: _cl_mem);
}

declare class unnamed_5219057221493548418 {
  constructor(init?: unnamed_5219057221493548418);
  s0: number;
  s1: number;
}

declare class unnamed_13260691394700945960 {
  constructor(init?: unnamed_13260691394700945960);
  lo: cl_char2;
  hi: cl_char2;
}

declare class unnamed_12549456473285533332 {
  constructor(init?: unnamed_12549456473285533332);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_15256887036015144609 {
  constructor(init?: unnamed_15256887036015144609);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_159222924329320256 {
  constructor(init?: unnamed_159222924329320256);
  s0: number;
  s1: number;
}

declare class unnamed_4028282752200185587 {
  constructor(init?: unnamed_4028282752200185587);
  lo: number;
  hi: number;
}

declare class unnamed_16959281423077821148 {
  constructor(init?: unnamed_16959281423077821148);
  lo: cl_double4;
  hi: cl_double4;
}

declare class unnamed_2834694814692681740 {
  constructor(init?: unnamed_2834694814692681740);
  x: number;
  y: number;
  z: number;
  w: number;
  __spacer4: number;
  __spacer5: number;
  __spacer6: number;
  __spacer7: number;
  __spacer8: number;
  __spacer9: number;
  sa: number;
  sb: number;
  sc: number;
  sd: number;
  se: number;
  sf: number;
}

declare class unnamed_4356081763692807939 {
  constructor(init?: unnamed_4356081763692807939);
  lo: cl_short8;
  hi: cl_short8;
}

declare class unnamed_15704488921777524102 {
  constructor(init?: unnamed_15704488921777524102);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class _cl_sampler {
  constructor(init?: _cl_sampler);
}

declare class unnamed_2149272547613073215 {
  constructor(init?: unnamed_2149272547613073215);
  s0: number;
  s1: number;
}

declare class unnamed_17980170885232899383 {
  constructor(init?: unnamed_17980170885232899383);
  x: number;
  y: number;
  z: number;
  w: number;
  __spacer4: number;
  __spacer5: number;
  __spacer6: number;
  __spacer7: number;
  __spacer8: number;
  __spacer9: number;
  sa: number;
  sb: number;
  sc: number;
  sd: number;
  se: number;
  sf: number;
}

declare class unnamed_11994757213479542098 {
  constructor(init?: unnamed_11994757213479542098);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_13320461778201585441 {
  constructor(init?: unnamed_13320461778201585441);
  lo: cl_uint4;
  hi: cl_uint4;
}

declare class _cl_context {
  constructor(init?: _cl_context);
}

declare class unnamed_9289550386312012466 {
  constructor(init?: unnamed_9289550386312012466);
  x: number;
  y: number;
}

declare class unnamed_10471347480373535166 {
  constructor(init?: unnamed_10471347480373535166);
  lo: cl_float2;
  hi: cl_float2;
}

declare class unnamed_1875860523750722620 {
  constructor(init?: unnamed_1875860523750722620);
  x: number;
  y: number;
  z: number;
  w: number;
  __spacer4: number;
  __spacer5: number;
  __spacer6: number;
  __spacer7: number;
  __spacer8: number;
  __spacer9: number;
  sa: number;
  sb: number;
  sc: number;
  sd: number;
  se: number;
  sf: number;
}

declare class unnamed_3673161230670366766 {
  constructor(init?: unnamed_3673161230670366766);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_11068696551276944428 {
  constructor(init?: unnamed_11068696551276944428);
  x: number;
  y: number;
}

declare class unnamed_600230121619828623 {
  constructor(init?: unnamed_600230121619828623);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_15331715987502894722 {
  constructor(init?: unnamed_15331715987502894722);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_2101168293470219234 {
  constructor(init?: unnamed_2101168293470219234);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_14225003743631509738 {
  constructor(init?: unnamed_14225003743631509738);
  lo: cl_double2;
  hi: cl_double2;
}

declare class unnamed_11700175491718462115 {
  constructor(init?: unnamed_11700175491718462115);
  x: number;
  y: number;
}

declare class unnamed_2552323460012218616 {
  constructor(init?: unnamed_2552323460012218616);
  lo: cl_uint2;
  hi: cl_uint2;
}

declare class unnamed_1047472312168669025 {
  constructor(init?: unnamed_1047472312168669025);
  lo: cl_int8;
  hi: cl_int8;
}

declare class unnamed_18152717688230967427 {
  constructor(init?: unnamed_18152717688230967427);
  lo: number;
  hi: number;
}

declare class unnamed_18317222777170162012 {
  constructor(init?: unnamed_18317222777170162012);
  lo: cl_ulong8;
  hi: cl_ulong8;
}

declare class unnamed_13101114464805566533 {
  constructor(init?: unnamed_13101114464805566533);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_1314304141384370253 {
  constructor(init?: unnamed_1314304141384370253);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
  s8: number;
  s9: number;
  sA: number;
  sB: number;
  sC: number;
  sD: number;
  sE: number;
  sF: number;
}

declare class unnamed_13174122816410880636 {
  constructor(init?: unnamed_13174122816410880636);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class _cl_platform_id {
  constructor(init?: _cl_platform_id);
}

declare class unnamed_10407365959024308971 {
  constructor(init?: unnamed_10407365959024308971);
  x: number;
  y: number;
}

declare class unnamed_9393313168929645737 {
  constructor(init?: unnamed_9393313168929645737);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
  s8: number;
  s9: number;
  sA: number;
  sB: number;
  sC: number;
  sD: number;
  sE: number;
  sF: number;
}

declare class _cl_kernel {
  constructor(init?: _cl_kernel);
}

declare class unnamed_11590620345495854670 {
  constructor(init?: unnamed_11590620345495854670);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
  s8: number;
  s9: number;
  sA: number;
  sB: number;
  sC: number;
  sD: number;
  sE: number;
  sF: number;
}

declare class unnamed_392995555903558520 {
  constructor(init?: unnamed_392995555903558520);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_9806171102498768262 {
  constructor(init?: unnamed_9806171102498768262);
  s0: number;
  s1: number;
}

declare class unnamed_14279403489433722746 {
  constructor(init?: unnamed_14279403489433722746);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_16445201664163532135 {
  constructor(init?: unnamed_16445201664163532135);
  lo: cl_long4;
  hi: cl_long4;
}

type cl_double8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_double8 {
  constructor(init?: cl_double8Descriptor);
  s: unknown /* const array */;
}

type cl_double4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_double4 {
  constructor(init?: cl_double4Descriptor);
  s: unknown /* const array */;
}

type cl_double2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_double2 {
  constructor(init?: cl_double2Descriptor);
  s: unknown /* const array */;
}

type cl_float16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_float16 {
  constructor(init?: cl_float16Descriptor);
  s: unknown /* const array */;
}

type cl_float8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_float8 {
  constructor(init?: cl_float8Descriptor);
  s: unknown /* const array */;
}

type cl_ulong16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ulong16 {
  constructor(init?: cl_ulong16Descriptor);
  s: unknown /* const array */;
}

type cl_ulong4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ulong4 {
  constructor(init?: cl_ulong4Descriptor);
  s: unknown /* const array */;
}

type cl_long16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_long16 {
  constructor(init?: cl_long16Descriptor);
  s: unknown /* const array */;
}

type cl_long8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_long8 {
  constructor(init?: cl_long8Descriptor);
  s: unknown /* const array */;
}

type cl_long4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_long4 {
  constructor(init?: cl_long4Descriptor);
  s: unknown /* const array */;
}

type cl_uint16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_uint16 {
  constructor(init?: cl_uint16Descriptor);
  s: unknown /* const array */;
}

type cl_uint8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_uint8 {
  constructor(init?: cl_uint8Descriptor);
  s: unknown /* const array */;
}

type cl_uint4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_uint4 {
  constructor(init?: cl_uint4Descriptor);
  s: unknown /* const array */;
}

type cl_uint2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_uint2 {
  constructor(init?: cl_uint2Descriptor);
  s: unknown /* const array */;
}

type cl_int8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_int8 {
  constructor(init?: cl_int8Descriptor);
  s: unknown /* const array */;
}

type cl_int4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_int4 {
  constructor(init?: cl_int4Descriptor);
  s: unknown /* const array */;
}

type cl_ushort4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ushort4 {
  constructor(init?: cl_ushort4Descriptor);
  s: unknown /* const array */;
}

type cl_ushort2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ushort2 {
  constructor(init?: cl_ushort2Descriptor);
  s: unknown /* const array */;
}

type cl_short4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_short4 {
  constructor(init?: cl_short4Descriptor);
  s: unknown /* const array */;
}

type cl_uchar8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_uchar8 {
  constructor(init?: cl_uchar8Descriptor);
  s: unknown /* const array */;
}

type cl_uchar4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_uchar4 {
  constructor(init?: cl_uchar4Descriptor);
  s: unknown /* const array */;
}

type cl_char2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_char2 {
  constructor(init?: cl_char2Descriptor);
  s: unknown /* const array */;
}

type cl_ulong8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ulong8 {
  constructor(init?: cl_ulong8Descriptor);
  s: unknown /* const array */;
}

type cl_float4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_float4 {
  constructor(init?: cl_float4Descriptor);
  s: unknown /* const array */;
}

type cl_float2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_float2 {
  constructor(init?: cl_float2Descriptor);
  s: unknown /* const array */;
}

type cl_char16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_char16 {
  constructor(init?: cl_char16Descriptor);
  s: unknown /* const array */;
}

type cl_uchar16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_uchar16 {
  constructor(init?: cl_uchar16Descriptor);
  s: unknown /* const array */;
}

type cl_ushort8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ushort8 {
  constructor(init?: cl_ushort8Descriptor);
  s: unknown /* const array */;
}

type cl_char4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_char4 {
  constructor(init?: cl_char4Descriptor);
  s: unknown /* const array */;
}

type cl_short8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_short8 {
  constructor(init?: cl_short8Descriptor);
  s: unknown /* const array */;
}

type cl_long2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_long2 {
  constructor(init?: cl_long2Descriptor);
  s: unknown /* const array */;
}

type cl_short16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_short16 {
  constructor(init?: cl_short16Descriptor);
  s: unknown /* const array */;
}

type cl_double16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_double16 {
  constructor(init?: cl_double16Descriptor);
  s: unknown /* const array */;
}

type cl_char8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_char8 {
  constructor(init?: cl_char8Descriptor);
  s: unknown /* const array */;
}

type cl_ushort16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ushort16 {
  constructor(init?: cl_ushort16Descriptor);
  s: unknown /* const array */;
}

type cl_uchar2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_uchar2 {
  constructor(init?: cl_uchar2Descriptor);
  s: unknown /* const array */;
}

type cl_int16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_int16 {
  constructor(init?: cl_int16Descriptor);
  s: unknown /* const array */;
}

type cl_short2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_short2 {
  constructor(init?: cl_short2Descriptor);
  s: unknown /* const array */;
}

type cl_int2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_int2 {
  constructor(init?: cl_int2Descriptor);
  s: unknown /* const array */;
}

type cl_ulong2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ulong2 {
  constructor(init?: cl_ulong2Descriptor);
  s: unknown /* const array */;
}

declare function clGetPlatformIDs(p1: number, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function clGetPlatformInfo(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clGetDeviceIDs(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clGetDeviceInfo(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clCreateSubDevices(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clRetainDevice(p1: interop.PointerConvertible): number;

declare function clReleaseDevice(p1: interop.PointerConvertible): number;

declare function clCreateContext(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: string, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => void, p5: interop.PointerConvertible, p6: interop.PointerConvertible): interop.Pointer;

declare function clCreateContextFromType(p1: interop.PointerConvertible, p2: number, p3: (p1: string, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => void, p4: interop.PointerConvertible, p5: interop.PointerConvertible): interop.Pointer;

declare function clRetainContext(p1: interop.PointerConvertible): number;

declare function clReleaseContext(p1: interop.PointerConvertible): number;

declare function clGetContextInfo(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clCreateCommandQueue(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible): interop.Pointer;

declare function clRetainCommandQueue(p1: interop.PointerConvertible): number;

declare function clReleaseCommandQueue(p1: interop.PointerConvertible): number;

declare function clGetCommandQueueInfo(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clCreateBuffer(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): interop.Pointer;

declare function clCreateSubBuffer(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): interop.Pointer;

declare function clCreateImage(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible): interop.Pointer;

declare function clRetainMemObject(p1: interop.PointerConvertible): number;

declare function clReleaseMemObject(p1: interop.PointerConvertible): number;

declare function clGetSupportedImageFormats(p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible): number;

declare function clGetMemObjectInfo(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clGetImageInfo(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clSetMemObjectDestructorCallback(p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p3: interop.PointerConvertible): number;

declare function clCreateSampler(p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible): interop.Pointer;

declare function clRetainSampler(p1: interop.PointerConvertible): number;

declare function clReleaseSampler(p1: interop.PointerConvertible): number;

declare function clGetSamplerInfo(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clCreateProgramWithSource(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible): interop.Pointer;

declare function clCreateProgramWithBinary(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible): interop.Pointer;

declare function clCreateProgramWithBuiltInKernels(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: string, p5: interop.PointerConvertible): interop.Pointer;

declare function clRetainProgram(p1: interop.PointerConvertible): number;

declare function clReleaseProgram(p1: interop.PointerConvertible): number;

declare function clBuildProgram(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: string, p5: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p6: interop.PointerConvertible): number;

declare function clCompileProgram(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: string, p5: number, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p9: interop.PointerConvertible): number;

declare function clLinkProgram(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: string, p5: number, p6: interop.PointerConvertible, p7: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p8: interop.PointerConvertible, p9: interop.PointerConvertible): interop.Pointer;

declare function clUnloadPlatformCompiler(p1: interop.PointerConvertible): number;

declare function clGetProgramInfo(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clGetProgramBuildInfo(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible): number;

declare function clCreateKernel(p1: interop.PointerConvertible, p2: string, p3: interop.PointerConvertible): interop.Pointer;

declare function clCreateKernelsInProgram(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible): number;

declare function clRetainKernel(p1: interop.PointerConvertible): number;

declare function clReleaseKernel(p1: interop.PointerConvertible): number;

declare function clSetKernelArg(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible): number;

declare function clGetKernelInfo(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clGetKernelArgInfo(p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible): number;

declare function clGetKernelWorkGroupInfo(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible): number;

declare function clWaitForEvents(p1: number, p2: interop.PointerConvertible): number;

declare function clGetEventInfo(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clCreateUserEvent(p1: interop.PointerConvertible, p2: interop.PointerConvertible): interop.Pointer;

declare function clRetainEvent(p1: interop.PointerConvertible): number;

declare function clReleaseEvent(p1: interop.PointerConvertible): number;

declare function clSetUserEventStatus(p1: interop.PointerConvertible, p2: number): number;

declare function clSetEventCallback(p1: interop.PointerConvertible, p2: number, p3: (p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible) => void, p4: interop.PointerConvertible): number;

declare function clGetEventProfilingInfo(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clFlush(p1: interop.PointerConvertible): number;

declare function clFinish(p1: interop.PointerConvertible): number;

declare function clEnqueueReadBuffer(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: interop.PointerConvertible, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible): number;

declare function clEnqueueReadBufferRect(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: number, p8: number, p9: number, p10: number, p11: interop.PointerConvertible, p12: number, p13: interop.PointerConvertible, p14: interop.PointerConvertible): number;

declare function clEnqueueWriteBuffer(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: interop.PointerConvertible, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible): number;

declare function clEnqueueWriteBufferRect(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: number, p8: number, p9: number, p10: number, p11: interop.PointerConvertible, p12: number, p13: interop.PointerConvertible, p14: interop.PointerConvertible): number;

declare function clEnqueueFillBuffer(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible): number;

declare function clEnqueueCopyBuffer(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible): number;

declare function clEnqueueCopyBufferRect(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: number, p8: number, p9: number, p10: number, p11: number, p12: interop.PointerConvertible, p13: interop.PointerConvertible): number;

declare function clEnqueueReadImage(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: number, p8: interop.PointerConvertible, p9: number, p10: interop.PointerConvertible, p11: interop.PointerConvertible): number;

declare function clEnqueueWriteImage(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: number, p8: interop.PointerConvertible, p9: number, p10: interop.PointerConvertible, p11: interop.PointerConvertible): number;

declare function clEnqueueFillImage(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: interop.PointerConvertible, p8: interop.PointerConvertible): number;

declare function clEnqueueCopyImage(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible): number;

declare function clEnqueueCopyImageToBuffer(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: number, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible): number;

declare function clEnqueueCopyBufferToImage(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible): number;

declare function clEnqueueMapBuffer(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: number, p6: number, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible, p10: interop.PointerConvertible): interop.Pointer;

declare function clEnqueueMapImage(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: interop.PointerConvertible, p9: number, p10: interop.PointerConvertible, p11: interop.PointerConvertible, p12: interop.PointerConvertible): interop.Pointer;

declare function clEnqueueUnmapMemObject(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible): number;

declare function clEnqueueMigrateMemObjects(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: interop.PointerConvertible): number;

declare function clEnqueueNDRangeKernel(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible, p7: number, p8: interop.PointerConvertible, p9: interop.PointerConvertible): number;

declare function clEnqueueTask(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clEnqueueNativeKernel(p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible) => void, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.PointerConvertible, p7: interop.PointerConvertible, p8: number, p9: interop.PointerConvertible, p10: interop.PointerConvertible): number;

declare function clEnqueueMarkerWithWaitList(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible): number;

declare function clEnqueueBarrierWithWaitList(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible): number;

declare function clGetExtensionFunctionAddressForPlatform(p1: interop.PointerConvertible, p2: string): interop.Pointer;

declare function clCreateImage2D(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: interop.PointerConvertible, p8: interop.PointerConvertible): interop.Pointer;

declare function clCreateImage3D(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: number, p7: number, p8: number, p9: interop.PointerConvertible, p10: interop.PointerConvertible): interop.Pointer;

declare function clEnqueueMarker(p1: interop.PointerConvertible, p2: interop.PointerConvertible): number;

declare function clEnqueueWaitForEvents(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible): number;

declare function clEnqueueBarrier(p1: interop.PointerConvertible): number;

declare function clUnloadCompiler(): number;

declare function clGetExtensionFunctionAddress(p1: string): interop.Pointer;

declare function clCreateFromGLBuffer(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible): interop.Pointer;

declare function clCreateFromGLTexture(p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: interop.PointerConvertible): interop.Pointer;

declare function clCreateFromGLRenderbuffer(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible): interop.Pointer;

declare function clGetGLObjectInfo(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): number;

declare function clGetGLTextureInfo(p1: interop.PointerConvertible, p2: number, p3: number, p4: interop.PointerConvertible, p5: interop.PointerConvertible): number;

declare function clEnqueueAcquireGLObjects(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible): number;

declare function clEnqueueReleaseGLObjects(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible): number;

declare function clCreateFromGLTexture2D(p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: interop.PointerConvertible): interop.Pointer;

declare function clCreateFromGLTexture3D(p1: interop.PointerConvertible, p2: number, p3: number, p4: number, p5: number, p6: interop.PointerConvertible): interop.Pointer;

declare function clGetGLContextInfoAPPLE(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: number, p4: number, p5: interop.PointerConvertible, p6: interop.PointerConvertible): number;

declare function clCreateEventFromGLsyncKHR(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible): interop.Pointer;

declare function clCreateImageFromIOSurface2DAPPLE(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: number, p5: number, p6: interop.Object, p7: interop.PointerConvertible): interop.Pointer;

declare function clCreateImageFromIOSurfaceWithPropertiesAPPLE(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: interop.PointerConvertible, p6: interop.PointerConvertible): interop.Pointer;

declare function clSetMemObjectDestructorAPPLE(p1: interop.PointerConvertible, p2: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, p3: interop.PointerConvertible): number;

declare function clLogMessagesToSystemLogAPPLE(p1: string, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible): void;

declare function clLogMessagesToStdoutAPPLE(p1: string, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible): void;

declare function clLogMessagesToStderrAPPLE(p1: string, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible): void;

declare function clCreateContextAndCommandQueueAPPLE(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: (p1: string, p2: interop.PointerConvertible, p3: number, p4: interop.PointerConvertible) => void, p5: interop.PointerConvertible, p6: number, p7: interop.PointerConvertible, p8: interop.PointerConvertible): number;

declare function clCreateProgramAndKernelsWithSourceAPPLE(p1: interop.PointerConvertible, p2: number, p3: interop.PointerConvertible, p4: interop.PointerConvertible, p5: number, p6: interop.PointerConvertible, p7: string, p8: number, p9: interop.PointerConvertible, p10: interop.PointerConvertible, p11: interop.PointerConvertible): number;

declare function clSetKernelArgsListAPPLE(p1: interop.PointerConvertible, p2: number): number;

declare function clSetKernelArgsVaListAPPLE(p1: interop.PointerConvertible, p2: number, p3: string): number;

declare function clSetKernelArgByNameAPPLE(p1: interop.PointerConvertible, p2: string, p3: number, p4: interop.PointerConvertible): number;

declare function clCreateDAGAPPLE(c: interop.PointerConvertible): interop.Pointer;

declare function clReleaseDAGAPPLE(dag: interop.PointerConvertible): void;

declare function clGetDAGNodeAPPLE(d: interop.PointerConvertible, f: interop.PointerConvertible, args: interop.PointerConvertible, arg_indices: interop.PointerConvertible, nargs: number): number;

declare function clCreateKernelFromDAGAPPLE(d: interop.PointerConvertible, n: number, list: interop.PointerConvertible): interop.Pointer;

declare function clCreateCommandQueueWithPropertiesAPPLE(p1: interop.PointerConvertible, p2: interop.PointerConvertible, p3: interop.PointerConvertible, p4: interop.PointerConvertible): interop.Pointer;

declare function gcl_create_dispatch_queue(flags: number, device_id: interop.PointerConvertible): NSObject;

declare function gcl_malloc(bytes: number, host_ptr: interop.PointerConvertible, flags: number): interop.Pointer;

declare function gcl_free(ptr: interop.PointerConvertible): void;

declare function gcl_create_image(image_format: interop.PointerConvertible, image_width: number, image_height: number, image_depth: number, io_surface: interop.Object): interop.Pointer;

declare function gcl_retain_image(image: interop.PointerConvertible): void;

declare function gcl_release_image(image: interop.PointerConvertible): void;

declare function gcl_get_supported_image_formats(device_id: interop.PointerConvertible, image_type: number, num_entries: number, image_formats: interop.PointerConvertible, num_image_formats: interop.PointerConvertible): void;

declare function gcl_memcpy(dst: interop.PointerConvertible, src: interop.PointerConvertible, size: number): void;

declare function gcl_memcpy_rect(dst: interop.PointerConvertible, src: interop.PointerConvertible, dst_origin: unknown /* const array */, src_origin: unknown /* const array */, region: unknown /* const array */, dst_row_pitch: number, dst_slice_pitch: number, src_row_pitch: number, src_slice_pitch: number): void;

declare function gcl_copy_image(dst_image: interop.PointerConvertible, src_image: interop.PointerConvertible, dst_origin: unknown /* const array */, src_origin: unknown /* const array */, region: unknown /* const array */): void;

declare function gcl_copy_ptr_to_image(dst_image: interop.PointerConvertible, src_ptr: interop.PointerConvertible, dst_origin: unknown /* const array */, region: unknown /* const array */): void;

declare function gcl_copy_image_to_ptr(dst_ptr: interop.PointerConvertible, src_image: interop.PointerConvertible, src_origin: unknown /* const array */, region: unknown /* const array */): void;

declare function gcl_map_ptr(ptr: interop.PointerConvertible, map_flags: number, cb: number): interop.Pointer;

declare function gcl_map_image(image: interop.PointerConvertible, map_flags: number, origin: unknown /* const array */, region: unknown /* const array */): interop.Pointer;

declare function gcl_unmap(p1: interop.PointerConvertible): void;

declare function gcl_create_kernel_from_block(kernel_block_ptr: interop.PointerConvertible): interop.Pointer;

declare function gcl_get_kernel_block_workgroup_info(kernel_block_ptr: interop.PointerConvertible, param_name: number, param_value_size: number, param_value: interop.PointerConvertible, param_value_size_ret: interop.PointerConvertible): void;

declare function gcl_get_device_id_with_dispatch_queue(queue: NSObject): interop.Pointer;

declare function gcl_set_finalizer(object: interop.PointerConvertible, cl_pfn_finalizer: (p1: interop.PointerConvertible, p2: interop.PointerConvertible) => void, user_data: interop.PointerConvertible): void;

declare function gcl_start_timer(): number;

declare function gcl_stop_timer(t: number): number;

declare function gcl_create_buffer_from_ptr(ptr: interop.PointerConvertible): interop.Pointer;

declare function gcl_gl_create_ptr_from_buffer(bufobj: number): interop.Pointer;

declare function gcl_gl_create_image_from_texture(texture_target: number, mip_level: number, texture: number): interop.Pointer;

declare function gcl_gl_create_image_from_renderbuffer(render_buffer: number): interop.Pointer;

declare function gcl_gl_set_sharegroup(share: interop.PointerConvertible): void;

declare function gcl_get_context(): interop.Pointer;

