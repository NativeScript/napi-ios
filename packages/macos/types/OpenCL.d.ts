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

declare class unnamed_16034811108561402464 {
  constructor(init?: unnamed_16034811108561402464);
  lo: cl_double8;
  hi: cl_double8;
}

declare class unnamed_2819662505498471704 {
  constructor(init?: unnamed_2819662505498471704);
  lo: cl_double4;
  hi: cl_double4;
}

declare class unnamed_3219181940098549515 {
  constructor(init?: unnamed_3219181940098549515);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_18354696321709473682 {
  constructor(init?: unnamed_18354696321709473682);
  s0: number;
  s1: number;
}

declare class unnamed_5099427627633689761 {
  constructor(init?: unnamed_5099427627633689761);
  lo: cl_float8;
  hi: cl_float8;
}

declare class unnamed_9570120833490121199 {
  constructor(init?: unnamed_9570120833490121199);
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

declare class unnamed_14038895401505408408 {
  constructor(init?: unnamed_14038895401505408408);
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

declare class unnamed_14633242823170636523 {
  constructor(init?: unnamed_14633242823170636523);
  lo: cl_float2;
  hi: cl_float2;
}

declare class unnamed_17791786919002749368 {
  constructor(init?: unnamed_17791786919002749368);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_6530372759096521643 {
  constructor(init?: unnamed_6530372759096521643);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_6188589366592898738 {
  constructor(init?: unnamed_6188589366592898738);
  lo: number;
  hi: number;
}

declare class unnamed_6612196975004174093 {
  constructor(init?: unnamed_6612196975004174093);
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

declare class unnamed_6472752661204557757 {
  constructor(init?: unnamed_6472752661204557757);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_2719441796413993843 {
  constructor(init?: unnamed_2719441796413993843);
  lo: cl_ulong2;
  hi: cl_ulong2;
}

declare class unnamed_7522825959710834146 {
  constructor(init?: unnamed_7522825959710834146);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_12561491991399553712 {
  constructor(init?: unnamed_12561491991399553712);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_10599617683292921951 {
  constructor(init?: unnamed_10599617683292921951);
  s0: number;
  s1: number;
}

declare class unnamed_13420978872563642741 {
  constructor(init?: unnamed_13420978872563642741);
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

declare class unnamed_8721104090434095600 {
  constructor(init?: unnamed_8721104090434095600);
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

declare class unnamed_15336942035615823607 {
  constructor(init?: unnamed_15336942035615823607);
  lo: number;
  hi: number;
}

declare class unnamed_2555550089059133021 {
  constructor(init?: unnamed_2555550089059133021);
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

declare class unnamed_17931293963522911835 {
  constructor(init?: unnamed_17931293963522911835);
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

declare class unnamed_6027689127615064521 {
  constructor(init?: unnamed_6027689127615064521);
  lo: cl_uint2;
  hi: cl_uint2;
}

declare class unnamed_6767419818264718803 {
  constructor(init?: unnamed_6767419818264718803);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_1819420466203880739 {
  constructor(init?: unnamed_1819420466203880739);
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

declare class unnamed_14728210720433338166 {
  constructor(init?: unnamed_14728210720433338166);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_17104770922173623215 {
  constructor(init?: unnamed_17104770922173623215);
  lo: cl_int2;
  hi: cl_int2;
}

declare class unnamed_739362498422776837 {
  constructor(init?: unnamed_739362498422776837);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_15269127906778106802 {
  constructor(init?: unnamed_15269127906778106802);
  lo: number;
  hi: number;
}

declare class unnamed_12746667840781852745 {
  constructor(init?: unnamed_12746667840781852745);
  s0: number;
  s1: number;
}

declare class unnamed_5795083664324778254 {
  constructor(init?: unnamed_5795083664324778254);
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

declare class unnamed_15181045986496109099 {
  constructor(init?: unnamed_15181045986496109099);
  lo: cl_ushort4;
  hi: cl_ushort4;
}

declare class unnamed_14800564279684125138 {
  constructor(init?: unnamed_14800564279684125138);
  lo: cl_int4;
  hi: cl_int4;
}

declare class unnamed_10502842994476019205 {
  constructor(init?: unnamed_10502842994476019205);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_74273077931814438 {
  constructor(init?: unnamed_74273077931814438);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_13090128613918077829 {
  constructor(init?: unnamed_13090128613918077829);
  s0: number;
  s1: number;
}

declare class unnamed_7233199044943222266 {
  constructor(init?: unnamed_7233199044943222266);
  lo: cl_short8;
  hi: cl_short8;
}

declare class unnamed_11283273495419222991 {
  constructor(init?: unnamed_11283273495419222991);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_2952525089179247331 {
  constructor(init?: unnamed_2952525089179247331);
  lo: cl_short2;
  hi: cl_short2;
}

declare class unnamed_776192571616592320 {
  constructor(init?: unnamed_776192571616592320);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_7685583719932560770 {
  constructor(init?: unnamed_7685583719932560770);
  s0: number;
  s1: number;
}

declare class unnamed_6163057139404872671 {
  constructor(init?: unnamed_6163057139404872671);
  x: number;
  y: number;
}

declare class unnamed_693354482524594845 {
  constructor(init?: unnamed_693354482524594845);
  lo: cl_uchar8;
  hi: cl_uchar8;
}

declare class unnamed_8910255871431256421 {
  constructor(init?: unnamed_8910255871431256421);
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

declare class unnamed_5115025008701481751 {
  constructor(init?: unnamed_5115025008701481751);
  lo: cl_uchar4;
  hi: cl_uchar4;
}

declare class unnamed_8271206444026783686 {
  constructor(init?: unnamed_8271206444026783686);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_11150196383070993406 {
  constructor(init?: unnamed_11150196383070993406);
  lo: cl_uchar2;
  hi: cl_uchar2;
}

declare class unnamed_10792301152710413319 {
  constructor(init?: unnamed_10792301152710413319);
  s0: number;
  s1: number;
}

declare class unnamed_15945774705627422475 {
  constructor(init?: unnamed_15945774705627422475);
  lo: cl_char8;
  hi: cl_char8;
}

declare class unnamed_14394187154476498222 {
  constructor(init?: unnamed_14394187154476498222);
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

declare class unnamed_6182718632721323282 {
  constructor(init?: unnamed_6182718632721323282);
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

declare class unnamed_1273822905655070330 {
  constructor(init?: unnamed_1273822905655070330);
  lo: cl_ushort8;
  hi: cl_ushort8;
}

declare class unnamed_3377347259633150282 {
  constructor(init?: unnamed_3377347259633150282);
  lo: cl_char4;
  hi: cl_char4;
}

declare class unnamed_8210053787908371511 {
  constructor(init?: unnamed_8210053787908371511);
  lo: cl_char2;
  hi: cl_char2;
}

declare class unnamed_982659719039718185 {
  constructor(init?: unnamed_982659719039718185);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_13286621471959288335 {
  constructor(init?: unnamed_13286621471959288335);
  lo: number;
  hi: number;
}

declare class unnamed_12437497114818524305 {
  constructor(init?: unnamed_12437497114818524305);
  s0: number;
  s1: number;
}

declare class unnamed_2186519694430481922 {
  constructor(init?: unnamed_2186519694430481922);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_6960209013535270555 {
  constructor(init?: unnamed_6960209013535270555);
  lo: cl_long2;
  hi: cl_long2;
}

declare class unnamed_13533710881337191989 {
  constructor(init?: unnamed_13533710881337191989);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_7437874460212522173 {
  constructor(init?: unnamed_7437874460212522173);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_6241790122804093816 {
  constructor(init?: unnamed_6241790122804093816);
  lo: cl_uint8;
  hi: cl_uint8;
}

declare class unnamed_6397840410872137413 {
  constructor(init?: unnamed_6397840410872137413);
  lo: cl_long4;
  hi: cl_long4;
}

declare class unnamed_18064820411455376396 {
  constructor(init?: unnamed_18064820411455376396);
  s0: number;
  s1: number;
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

declare class unnamed_9883327140142018045 {
  constructor(init?: unnamed_9883327140142018045);
  lo: number;
  hi: number;
}

declare class unnamed_12624203642288807035 {
  constructor(init?: unnamed_12624203642288807035);
  lo: number;
  hi: number;
}

declare class unnamed_6500221450325593087 {
  constructor(init?: unnamed_6500221450325593087);
  s0: number;
  s1: number;
}

declare class unnamed_17729007419039326301 {
  constructor(init?: unnamed_17729007419039326301);
  lo: cl_long8;
  hi: cl_long8;
}

declare class _cl_program {
  constructor(init?: _cl_program);
}

declare class unnamed_1946820365813514541 {
  constructor(init?: unnamed_1946820365813514541);
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

declare class unnamed_2487186800082705995 {
  constructor(init?: unnamed_2487186800082705995);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_1569544728411194586 {
  constructor(init?: unnamed_1569544728411194586);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_14593402944719333552 {
  constructor(init?: unnamed_14593402944719333552);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_1644755732203373115 {
  constructor(init?: unnamed_1644755732203373115);
  lo: cl_ushort2;
  hi: cl_ushort2;
}

declare class unnamed_9049553175772090190 {
  constructor(init?: unnamed_9049553175772090190);
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

declare class unnamed_3837577725587740317 {
  constructor(init?: unnamed_3837577725587740317);
  lo: number;
  hi: number;
}

declare class unnamed_9979595282118533093 {
  constructor(init?: unnamed_9979595282118533093);
  x: number;
  y: number;
}

declare class unnamed_18238269395002839470 {
  constructor(init?: unnamed_18238269395002839470);
  x: number;
  y: number;
}

declare class unnamed_10400188111848522637 {
  constructor(init?: unnamed_10400188111848522637);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_12754060223060493855 {
  constructor(init?: unnamed_12754060223060493855);
  lo: cl_uint4;
  hi: cl_uint4;
}

declare class unnamed_9157561686933708146 {
  constructor(init?: unnamed_9157561686933708146);
  x: number;
  y: number;
}

declare class unnamed_16385338497790649991 {
  constructor(init?: unnamed_16385338497790649991);
  x: number;
  y: number;
}

declare class unnamed_6458311726042768331 {
  constructor(init?: unnamed_6458311726042768331);
  s0: number;
  s1: number;
}

declare class unnamed_12004882356018572084 {
  constructor(init?: unnamed_12004882356018572084);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_6438040471757030141 {
  constructor(init?: unnamed_6438040471757030141);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_15100707233021697975 {
  constructor(init?: unnamed_15100707233021697975);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_6763021381838628833 {
  constructor(init?: unnamed_6763021381838628833);
  lo: cl_int8;
  hi: cl_int8;
}

declare class unnamed_9618557860090300578 {
  constructor(init?: unnamed_9618557860090300578);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_4666911346988320980 {
  constructor(init?: unnamed_4666911346988320980);
  x: number;
  y: number;
}

declare class _cl_mem {
  constructor(init?: _cl_mem);
}

declare class unnamed_3986540473480319689 {
  constructor(init?: unnamed_3986540473480319689);
  lo: cl_float4;
  hi: cl_float4;
}

declare class unnamed_11134364468959895575 {
  constructor(init?: unnamed_11134364468959895575);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_13740118056625853865 {
  constructor(init?: unnamed_13740118056625853865);
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

declare class unnamed_6924731791719995564 {
  constructor(init?: unnamed_6924731791719995564);
  x: number;
  y: number;
}

declare class unnamed_9585116623290011903 {
  constructor(init?: unnamed_9585116623290011903);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class _cl_sampler {
  constructor(init?: _cl_sampler);
}

declare class unnamed_10482239830954401727 {
  constructor(init?: unnamed_10482239830954401727);
  lo: number;
  hi: number;
}

declare class unnamed_12484321073972680486 {
  constructor(init?: unnamed_12484321073972680486);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_11189614783186180804 {
  constructor(init?: unnamed_11189614783186180804);
  x: number;
  y: number;
}

declare class unnamed_1748794661801335929 {
  constructor(init?: unnamed_1748794661801335929);
  lo: cl_double2;
  hi: cl_double2;
}

declare class unnamed_5721823564588727388 {
  constructor(init?: unnamed_5721823564588727388);
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

declare class unnamed_8981274017641558109 {
  constructor(init?: unnamed_8981274017641558109);
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

declare class unnamed_11302872970779158884 {
  constructor(init?: unnamed_11302872970779158884);
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

declare class _cl_context {
  constructor(init?: _cl_context);
}

declare class unnamed_3720990161873163288 {
  constructor(init?: unnamed_3720990161873163288);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_12114216443084654599 {
  constructor(init?: unnamed_12114216443084654599);
  lo: cl_short4;
  hi: cl_short4;
}

declare class unnamed_9773897657373769585 {
  constructor(init?: unnamed_9773897657373769585);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_14636497690848038482 {
  constructor(init?: unnamed_14636497690848038482);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_15621542676825204315 {
  constructor(init?: unnamed_15621542676825204315);
  x: number;
  y: number;
}

declare class unnamed_1297227212635802800 {
  constructor(init?: unnamed_1297227212635802800);
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

declare class unnamed_11260123065878261137 {
  constructor(init?: unnamed_11260123065878261137);
  lo: cl_ulong4;
  hi: cl_ulong4;
}

declare class unnamed_15960992654880514058 {
  constructor(init?: unnamed_15960992654880514058);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_7680766546587653470 {
  constructor(init?: unnamed_7680766546587653470);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_11332789061462845115 {
  constructor(init?: unnamed_11332789061462845115);
  x: number;
  y: number;
}

declare class unnamed_3275707324775388011 {
  constructor(init?: unnamed_3275707324775388011);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_14643397470680795882 {
  constructor(init?: unnamed_14643397470680795882);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
}

declare class unnamed_12651311968785683267 {
  constructor(init?: unnamed_12651311968785683267);
  lo: number;
  hi: number;
}

declare class unnamed_5463109362388884269 {
  constructor(init?: unnamed_5463109362388884269);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_13390172889855948814 {
  constructor(init?: unnamed_13390172889855948814);
  x: number;
  y: number;
  z: number;
  w: number;
}

declare class unnamed_5673994448134028211 {
  constructor(init?: unnamed_5673994448134028211);
  lo: cl_ulong8;
  hi: cl_ulong8;
}

declare class unnamed_17661578356839386753 {
  constructor(init?: unnamed_17661578356839386753);
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

declare class _cl_platform_id {
  constructor(init?: _cl_platform_id);
}

declare class unnamed_13694083251232476035 {
  constructor(init?: unnamed_13694083251232476035);
  lo: number;
  hi: number;
}

declare class _cl_kernel {
  constructor(init?: _cl_kernel);
}

declare class unnamed_14620490594992007504 {
  constructor(init?: unnamed_14620490594992007504);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
}

declare class unnamed_7482864552580001480 {
  constructor(init?: unnamed_7482864552580001480);
  s0: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
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

type cl_short16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_short16 {
  constructor(init?: cl_short16Descriptor);
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

type cl_uchar2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_uchar2 {
  constructor(init?: cl_uchar2Descriptor);
  s: unknown /* const array */;
}

type cl_char16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_char16 {
  constructor(init?: cl_char16Descriptor);
  s: unknown /* const array */;
}

type cl_char2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_char2 {
  constructor(init?: cl_char2Descriptor);
  s: unknown /* const array */;
}

type cl_char4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_char4 {
  constructor(init?: cl_char4Descriptor);
  s: unknown /* const array */;
}

type cl_ushort8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ushort8 {
  constructor(init?: cl_ushort8Descriptor);
  s: unknown /* const array */;
}

type cl_float2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_float2 {
  constructor(init?: cl_float2Descriptor);
  s: unknown /* const array */;
}

type cl_float4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_float4 {
  constructor(init?: cl_float4Descriptor);
  s: unknown /* const array */;
}

type cl_ulong2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ulong2 {
  constructor(init?: cl_ulong2Descriptor);
  s: unknown /* const array */;
}

type cl_uchar16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_uchar16 {
  constructor(init?: cl_uchar16Descriptor);
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

type cl_ushort16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_ushort16 {
  constructor(init?: cl_ushort16Descriptor);
  s: unknown /* const array */;
}

type cl_long2Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_long2 {
  constructor(init?: cl_long2Descriptor);
  s: unknown /* const array */;
}

type cl_int4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_int4 {
  constructor(init?: cl_int4Descriptor);
  s: unknown /* const array */;
}

type cl_uint16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_uint16 {
  constructor(init?: cl_uint16Descriptor);
  s: unknown /* const array */;
}

type cl_short8Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_short8 {
  constructor(init?: cl_short8Descriptor);
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

type cl_short4Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_short4 {
  constructor(init?: cl_short4Descriptor);
  s: unknown /* const array */;
}

type cl_int16Descriptor = 
  | { s: unknown /* const array */ };

declare class cl_int16 {
  constructor(init?: cl_int16Descriptor);
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

