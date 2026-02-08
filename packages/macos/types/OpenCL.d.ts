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

declare class unnamed_11491444609791562183 {
  constructor(init?: unnamed_11491444609791562183);
  lo: cl_double8;
  hi: cl_double8;
}

declare class unnamed_641055088265934225 {
  constructor(init?: unnamed_641055088265934225);
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

declare class unnamed_8538110425911963589 {
  constructor(init?: unnamed_8538110425911963589);
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

declare class unnamed_4799372599579847976 {
  constructor(init?: unnamed_4799372599579847976);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_4000056848239924180 {
  constructor(init?: unnamed_4000056848239924180);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_8911356308932491313 {
  constructor(init?: unnamed_8911356308932491313);
  lo: number;
  hi: number;
}

declare class unnamed_2925101827641201083 {
  constructor(init?: unnamed_2925101827641201083);
  x: number;
  y: number;
}

declare class unnamed_8219248703889924513 {
  constructor(init?: unnamed_8219248703889924513);
  lo: cl_float8;
  hi: cl_float8;
}

declare class unnamed_10137498427678198406 {
  constructor(init?: unnamed_10137498427678198406);
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

declare class unnamed_17344427348691653609 {
  constructor(init?: unnamed_17344427348691653609);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_15812001398811806078 {
  constructor(init?: unnamed_15812001398811806078);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_17349683349549516653 {
  constructor(init?: unnamed_17349683349549516653);
  lo: number;
  hi: number;
}

declare class unnamed_5402739150505216260 {
  constructor(init?: unnamed_5402739150505216260);
  s0: number;
  s1: number;
}

declare class unnamed_17792563033538282999 {
  constructor(init?: unnamed_17792563033538282999);
  lo: cl_ulong8;
  hi: cl_ulong8;
}

declare class unnamed_6310566789647032338 {
  constructor(init?: unnamed_6310566789647032338);
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

declare class unnamed_11389527130669548169 {
  constructor(init?: unnamed_11389527130669548169);
  lo: cl_ulong4;
  hi: cl_ulong4;
}

declare class unnamed_1500672663396316939 {
  constructor(init?: unnamed_1500672663396316939);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_306699425959537066 {
  constructor(init?: unnamed_306699425959537066);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_9830475697625813763 {
  constructor(init?: unnamed_9830475697625813763);
  x: number;
  y: number;
}

declare class unnamed_2402947569889233664 {
  constructor(init?: unnamed_2402947569889233664);
  lo: cl_long8;
  hi: cl_long8;
}

declare class unnamed_16884494980922531903 {
  constructor(init?: unnamed_16884494980922531903);
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

declare class unnamed_13404614886659900497 {
  constructor(init?: unnamed_13404614886659900497);
  lo: cl_long4;
  hi: cl_long4;
}

declare class unnamed_15558075507792729811 {
  constructor(init?: unnamed_15558075507792729811);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_7710844006461624304 {
  constructor(init?: unnamed_7710844006461624304);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_12961033938725480525 {
  constructor(init?: unnamed_12961033938725480525);
  s0: number;
  s1: number;
}

declare class unnamed_14653641027337033237 {
  constructor(init?: unnamed_14653641027337033237);
  lo: cl_uint8;
  hi: cl_uint8;
}

declare class unnamed_14646650288629814628 {
  constructor(init?: unnamed_14646650288629814628);
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

declare class unnamed_7141085555707230695 {
  constructor(init?: unnamed_7141085555707230695);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_1176196525150730655 {
  constructor(init?: unnamed_1176196525150730655);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_1836382535789256784 {
  constructor(init?: unnamed_1836382535789256784);
  s0: number;
  s1: number;
}

declare class unnamed_14350311817686984246 {
  constructor(init?: unnamed_14350311817686984246);
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

declare class unnamed_11895607400562483712 {
  constructor(init?: unnamed_11895607400562483712);
  lo: cl_int2;
  hi: cl_int2;
}

declare class unnamed_2088801286910661874 {
  constructor(init?: unnamed_2088801286910661874);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_8918381690263103147 {
  constructor(init?: unnamed_8918381690263103147);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_10184446444335736282 {
  constructor(init?: unnamed_10184446444335736282);
  s0: number;
  s1: number;
}

declare class unnamed_11077567084151507446 {
  constructor(init?: unnamed_11077567084151507446);
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

declare class unnamed_4045080051376847542 {
  constructor(init?: unnamed_4045080051376847542);
  lo: cl_ushort4;
  hi: cl_ushort4;
}

declare class unnamed_1295397474811520357 {
  constructor(init?: unnamed_1295397474811520357);
  lo: cl_ushort2;
  hi: cl_ushort2;
}

declare class unnamed_11103330894972741718 {
  constructor(init?: unnamed_11103330894972741718);
  s0: number;
  s1: number;
}

declare class unnamed_3506011298714429016 {
  constructor(init?: unnamed_3506011298714429016);
  x: number;
  y: number;
}

declare class unnamed_11490036408482722283 {
  constructor(init?: unnamed_11490036408482722283);
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

declare class unnamed_14938662359490945568 {
  constructor(init?: unnamed_14938662359490945568);
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

declare class unnamed_6495408554909187041 {
  constructor(init?: unnamed_6495408554909187041);
  lo: cl_short4;
  hi: cl_short4;
}

declare class unnamed_4294266831578319650 {
  constructor(init?: unnamed_4294266831578319650);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_11913332381075319848 {
  constructor(init?: unnamed_11913332381075319848);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_11169328333880963806 {
  constructor(init?: unnamed_11169328333880963806);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_8998229445599029310 {
  constructor(init?: unnamed_8998229445599029310);
  lo: number;
  hi: number;
}

declare class unnamed_4086866185919867445 {
  constructor(init?: unnamed_4086866185919867445);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_12963909333872473375 {
  constructor(init?: unnamed_12963909333872473375);
  s0: number;
  s1: number;
}

declare class unnamed_13734397614799716923 {
  constructor(init?: unnamed_13734397614799716923);
  x: number;
  y: number;
}

declare class unnamed_7849234023413420489 {
  constructor(init?: unnamed_7849234023413420489);
  lo: cl_double2;
  hi: cl_double2;
}

declare class unnamed_11456255350967873418 {
  constructor(init?: unnamed_11456255350967873418);
  lo: cl_uchar4;
  hi: cl_uchar4;
}

declare class unnamed_16195913061064217452 {
  constructor(init?: unnamed_16195913061064217452);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_14489020840624953211 {
  constructor(init?: unnamed_14489020840624953211);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_12098177562731918041 {
  constructor(init?: unnamed_12098177562731918041);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_15816625986010055495 {
  constructor(init?: unnamed_15816625986010055495);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_14796629808683815845 {
  constructor(init?: unnamed_14796629808683815845);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_11131792579420337063 {
  constructor(init?: unnamed_11131792579420337063);
  lo: number;
  hi: number;
}

declare class unnamed_536562444988566387 {
  constructor(init?: unnamed_536562444988566387);
  x: number;
  y: number;
}

declare class unnamed_664220319419428155 {
  constructor(init?: unnamed_664220319419428155);
  lo: cl_int8;
  hi: cl_int8;
}

declare class unnamed_3129353636519004805 {
  constructor(init?: unnamed_3129353636519004805);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_4319206990088480483 {
  constructor(init?: unnamed_4319206990088480483);
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

declare class unnamed_8877372706176956547 {
  constructor(init?: unnamed_8877372706176956547);
  lo: number;
  hi: number;
}

declare class unnamed_7318815525159314598 {
  constructor(init?: unnamed_7318815525159314598);
  x: number;
  y: number;
}

declare class unnamed_2102221410255968024 {
  constructor(init?: unnamed_2102221410255968024);
  s0: number;
  s1: number;
}

declare class unnamed_11190687851773913262 {
  constructor(init?: unnamed_11190687851773913262);
  s0: number;
  s1: number;
}

declare class _cl_program {
  constructor(init?: _cl_program);
}

declare class unnamed_1602040721991140391 {
  constructor(init?: unnamed_1602040721991140391);
  x: number;
  y: number;
}

declare class unnamed_15943091204568869836 {
  constructor(init?: unnamed_15943091204568869836);
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

declare class unnamed_17457165228436218542 {
  constructor(init?: unnamed_17457165228436218542);
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

declare class unnamed_2611059307318386705 {
  constructor(init?: unnamed_2611059307318386705);
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

declare class unnamed_13055923796007078920 {
  constructor(init?: unnamed_13055923796007078920);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_486780980182053267 {
  constructor(init?: unnamed_486780980182053267);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_2972807237871321892 {
  constructor(init?: unnamed_2972807237871321892);
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

declare class unnamed_14197039367218345573 {
  constructor(init?: unnamed_14197039367218345573);
  lo: number;
  hi: number;
}

declare class unnamed_10313713537770922038 {
  constructor(init?: unnamed_10313713537770922038);
  x: number;
  y: number;
}

declare class unnamed_577560272755952218 {
  constructor(init?: unnamed_577560272755952218);
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

declare class unnamed_15186233008951207488 {
  constructor(init?: unnamed_15186233008951207488);
  lo: cl_long2;
  hi: cl_long2;
}

declare class unnamed_6056978659508071738 {
  constructor(init?: unnamed_6056978659508071738);
  lo: number;
  hi: number;
}

declare class unnamed_15070680565842784968 {
  constructor(init?: unnamed_15070680565842784968);
  s0: number;
  s1: number;
}

declare class unnamed_7210747983984358160 {
  constructor(init?: unnamed_7210747983984358160);
  lo: cl_float2;
  hi: cl_float2;
}

declare class unnamed_6338734903141907488 {
  constructor(init?: unnamed_6338734903141907488);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_14103658073722438978 {
  constructor(init?: unnamed_14103658073722438978);
  lo: cl_ushort8;
  hi: cl_ushort8;
}

declare class unnamed_4347925800311461899 {
  constructor(init?: unnamed_4347925800311461899);
  lo: cl_short8;
  hi: cl_short8;
}

declare class unnamed_8699789743126012760 {
  constructor(init?: unnamed_8699789743126012760);
  lo: number;
  hi: number;
}

declare class unnamed_18389776409598962793 {
  constructor(init?: unnamed_18389776409598962793);
  x: number;
  y: number;
}

declare class unnamed_11209061023882255114 {
  constructor(init?: unnamed_11209061023882255114);
  lo: cl_uint2;
  hi: cl_uint2;
}

declare class unnamed_15604516887092601985 {
  constructor(init?: unnamed_15604516887092601985);
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

declare class _cl_mem {
  constructor(init?: _cl_mem);
}

declare class unnamed_10238448330218938424 {
  constructor(init?: unnamed_10238448330218938424);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_1181543174640856083 {
  constructor(init?: unnamed_1181543174640856083);
  lo: cl_uint4;
  hi: cl_uint4;
}

declare class unnamed_5125034305670120750 {
  constructor(init?: unnamed_5125034305670120750);
  lo: cl_uchar2;
  hi: cl_uchar2;
}

declare class unnamed_13187556709262286509 {
  constructor(init?: unnamed_13187556709262286509);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class _cl_sampler {
  constructor(init?: _cl_sampler);
}

declare class unnamed_12918680120133493218 {
  constructor(init?: unnamed_12918680120133493218);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_5964180369208096564 {
  constructor(init?: unnamed_5964180369208096564);
  lo: cl_uchar8;
  hi: cl_uchar8;
}

declare class unnamed_7000907034260267023 {
  constructor(init?: unnamed_7000907034260267023);
  lo: cl_int4;
  hi: cl_int4;
}

declare class unnamed_15418674016467663763 {
  constructor(init?: unnamed_15418674016467663763);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_10002502647024632687 {
  constructor(init?: unnamed_10002502647024632687);
  lo: cl_char8;
  hi: cl_char8;
}

declare class unnamed_14601577629019734104 {
  constructor(init?: unnamed_14601577629019734104);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_14832587755218947334 {
  constructor(init?: unnamed_14832587755218947334);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_504452724234289469 {
  constructor(init?: unnamed_504452724234289469);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_6511001814076210357 {
  constructor(init?: unnamed_6511001814076210357);
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

declare class unnamed_1704083856248977086 {
  constructor(init?: unnamed_1704083856248977086);
  lo: number;
  hi: number;
}

declare class unnamed_3725344531837058834 {
  constructor(init?: unnamed_3725344531837058834);
  x: number;
  y: number;
}

declare class unnamed_5992942454559041351 {
  constructor(init?: unnamed_5992942454559041351);
  lo: cl_ulong2;
  hi: cl_ulong2;
}

declare class unnamed_18207709497680060112 {
  constructor(init?: unnamed_18207709497680060112);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class _cl_context {
  constructor(init?: _cl_context);
}

declare class unnamed_6962546765129664842 {
  constructor(init?: unnamed_6962546765129664842);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_8152743211700721817 {
  constructor(init?: unnamed_8152743211700721817);
  lo: cl_char2;
  hi: cl_char2;
}

declare class unnamed_2995823293484838562 {
  constructor(init?: unnamed_2995823293484838562);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_16755180350349619265 {
  constructor(init?: unnamed_16755180350349619265);
  lo: cl_float4;
  hi: cl_float4;
}

declare class unnamed_6136757842616019476 {
  constructor(init?: unnamed_6136757842616019476);
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

declare class unnamed_8455962975566446929 {
  constructor(init?: unnamed_8455962975566446929);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_7658162522838216940 {
  constructor(init?: unnamed_7658162522838216940);
  lo: cl_short2;
  hi: cl_short2;
}

declare class unnamed_8235950270779779586 {
  constructor(init?: unnamed_8235950270779779586);
  lo: cl_double4;
  hi: cl_double4;
}

declare class unnamed_12062248842780685697 {
  constructor(init?: unnamed_12062248842780685697);
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

declare class unnamed_105871644007131803 {
  constructor(init?: unnamed_105871644007131803);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_9745189925541254767 {
  constructor(init?: unnamed_9745189925541254767);
  lo: cl_char4;
  hi: cl_char4;
}

declare class unnamed_17141880958591305718 {
  constructor(init?: unnamed_17141880958591305718);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_3394709950060744437 {
  constructor(init?: unnamed_3394709950060744437);
  s0: number;
  s1: number;
}

declare class _cl_platform_id {
  constructor(init?: _cl_platform_id);
}

declare class _cl_kernel {
  constructor(init?: _cl_kernel);
}

declare class unnamed_17835020526893199544 {
  constructor(init?: unnamed_17835020526893199544);
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

declare class unnamed_7233067340667913381 {
  constructor(init?: unnamed_7233067340667913381);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_14376896246717150535 {
  constructor(init?: unnamed_14376896246717150535);
  lo: number;
  hi: number;
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

type cl_ulong8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ulong8 {
  constructor(init?: cl_ulong8Descriptor);
  s: unknown /* const array */;
}

type cl_ulong4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ulong4 {
  constructor(init?: cl_ulong4Descriptor);
  s: unknown /* const array */;
}

type cl_long8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_long8 {
  constructor(init?: cl_long8Descriptor);
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

type cl_ushort8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ushort8 {
  constructor(init?: cl_ushort8Descriptor);
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

type cl_uchar2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_uchar2 {
  constructor(init?: cl_uchar2Descriptor);
  s: unknown /* const array */;
}

type cl_char4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_char4 {
  constructor(init?: cl_char4Descriptor);
  s: unknown /* const array */;
}

type cl_char2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_char2 {
  constructor(init?: cl_char2Descriptor);
  s: unknown /* const array */;
}

type cl_uchar4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_uchar4 {
  constructor(init?: cl_uchar4Descriptor);
  s: unknown /* const array */;
}

type cl_char16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_char16 {
  constructor(init?: cl_char16Descriptor);
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

type cl_int4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_int4 {
  constructor(init?: cl_int4Descriptor);
  s: unknown /* const array */;
}

type cl_short8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_short8 {
  constructor(init?: cl_short8Descriptor);
  s: unknown /* const array */;
}

type cl_ushort16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ushort16 {
  constructor(init?: cl_ushort16Descriptor);
  s: unknown /* const array */;
}

type cl_int16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_int16 {
  constructor(init?: cl_int16Descriptor);
  s: unknown /* const array */;
}

type cl_uchar16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_uchar16 {
  constructor(init?: cl_uchar16Descriptor);
  s: unknown /* const array */;
}

type cl_float4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_float4 {
  constructor(init?: cl_float4Descriptor);
  s: unknown /* const array */;
}

type cl_short16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_short16 {
  constructor(init?: cl_short16Descriptor);
  s: unknown /* const array */;
}

type cl_float2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_float2 {
  constructor(init?: cl_float2Descriptor);
  s: unknown /* const array */;
}

type cl_int2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_int2 {
  constructor(init?: cl_int2Descriptor);
  s: unknown /* const array */;
}

type cl_short2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_short2 {
  constructor(init?: cl_short2Descriptor);
  s: unknown /* const array */;
}

type cl_long4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_long4 {
  constructor(init?: cl_long4Descriptor);
  s: unknown /* const array */;
}

type cl_long2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_long2 {
  constructor(init?: cl_long2Descriptor);
  s: unknown /* const array */;
}

type cl_ulong2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ulong2 {
  constructor(init?: cl_ulong2Descriptor);
  s: unknown /* const array */;
}

type cl_long16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_long16 {
  constructor(init?: cl_long16Descriptor);
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

