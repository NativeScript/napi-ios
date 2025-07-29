/// <reference types="@nativescript/objc-node-api" />

declare const Y: number;

declare const SMAP_LEFT: number;

declare const SMAP_BOTTOM: number;

declare const SMAP_FRONT: number;

declare const glutBitmapHelvetica12: interop.Pointer;

declare const glutBitmap8By13: interop.Pointer;

declare const glutStrokeMonoRoman: interop.Pointer;

declare const _gle_gc: interop.Pointer;

declare const glutBitmapHelvetica10: interop.Pointer;

declare const SMAP_TOP: number;

declare const glutBitmapTimesRoman24: interop.Pointer;

declare const glutStrokeRoman: interop.Pointer;

declare const glutBitmapHelvetica18: interop.Pointer;

declare const glutBitmapTimesRoman10: interop.Pointer;

declare const X: number;

declare const SMAP_RIGHT: number;

declare const glutBitmap9By15: interop.Pointer;

declare const SMAP_BACK: number;

declare const Z: number;

declare const SphereMapFlags: {
  CLEAR_SMAP_TEXTURE: 1,
  GENERATE_VIEW_MIPMAPS: 2,
  GENERATE_SMAP_MIPMAPS: 4,
  GENERATE_MIPMAPS: 6,
};

declare class BitmapCharRec {
  constructor(init?: BitmapCharRec);
  width: number;
  height: number;
  xorig: number;
  yorig: number;
  advance: number;
  bitmap: interop.Pointer;
}

declare class StrokeFontRec {
  constructor(init?: StrokeFontRec);
  name: string | null;
  num_chars: number;
  ch: interop.Pointer;
  top: number;
  bottom: number;
}

declare class StrokeRec {
  constructor(init?: StrokeRec);
  num_coords: number;
  coord: interop.Pointer;
}

declare class _SphereMapMesh {
  constructor(init?: _SphereMapMesh);
  refcnt: number;
  steps: number;
  rings: number;
  edgeExtend: number;
  face: interop.Pointer;
  back: interop.Pointer;
}

declare class _SphereMap {
  constructor(init?: _SphereMap);
  mesh: interop.Pointer;
  smapTexObj: number;
  viewTexObjs: unknown /* const array */;
  viewTexObj: number;
  flags: interop.Enum<typeof SphereMapFlags>;
  viewTexDim: number;
  smapTexDim: number;
  viewOrigin: unknown /* const array */;
  smapOrigin: unknown /* const array */;
  eye: unknown /* const array */;
  up: unknown /* const array */;
  obj: unknown /* const array */;
  viewNear: number;
  viewFar: number;
  positionLights: (p1: number, p2: interop.PointerConvertible) => void | null;
  drawView: (p1: number, p2: interop.PointerConvertible) => void | null;
  context: interop.Pointer;
}

declare class _STXY {
  constructor(init?: _STXY);
  s: number;
  t: number;
  x: number;
  y: number;
}

declare class gleGC {
  constructor(init?: gleGC);
  bgn_gen_texture: (p1: number, p2: number) => void | null;
  n3f_gen_texture: (p1: interop.PointerConvertible) => void | null;
  n3d_gen_texture: (p1: interop.PointerConvertible) => void | null;
  v3f_gen_texture: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  v3d_gen_texture: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  end_gen_texture: () => void | null;
  join_style: number;
  ncp: number;
  contour: interop.Pointer;
  cont_normal: interop.Pointer;
  up: interop.Pointer;
  npoints: number;
  point_array: interop.Pointer;
  color_array: interop.Pointer;
  xform_array: interop.Pointer;
  num_vert: number;
  segment_number: number;
  segment_length: number;
  accum_seg_len: number;
  prev_x: number;
  prev_y: number;
  save_bgn_gen_texture: (p1: number, p2: number) => void | null;
  save_n3f_gen_texture: (p1: interop.PointerConvertible) => void | null;
  save_n3d_gen_texture: (p1: interop.PointerConvertible) => void | null;
  save_v3f_gen_texture: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  save_v3d_gen_texture: (p1: interop.PointerConvertible, p2: number, p3: number) => void | null;
  save_end_gen_texture: () => void | null;
}

declare class CoordRec {
  constructor(init?: CoordRec);
  x: number;
  y: number;
}

declare class BitmapFontRec {
  constructor(init?: BitmapFontRec);
  name: string | null;
  num_chars: number;
  first: number;
  ch: interop.Pointer;
}

declare class StrokeCharRec {
  constructor(init?: StrokeCharRec);
  num_strokes: number;
  stroke: interop.Pointer;
  center: number;
  right: number;
}

declare function glutInit(argcp: interop.PointerConvertible, argv: interop.PointerConvertible): void;

declare function glutInitDisplayMode(mode: number): void;

declare function glutInitDisplayString(string: string): void;

declare function glutInitWindowPosition(x: number, y: number): void;

declare function glutInitWindowSize(width: number, height: number): void;

declare function glutMainLoop(): void;

declare function glutCreateWindow(title: string): number;

declare function glutCreateSubWindow(win: number, x: number, y: number, width: number, height: number): number;

declare function glutDestroyWindow(win: number): void;

declare function glutPostRedisplay(): void;

declare function glutPostWindowRedisplay(win: number): void;

declare function glutSwapBuffers(): void;

declare function glutGetWindow(): number;

declare function glutSetWindow(win: number): void;

declare function glutSetWindowTitle(title: string): void;

declare function glutSetIconTitle(title: string): void;

declare function glutPositionWindow(x: number, y: number): void;

declare function glutReshapeWindow(width: number, height: number): void;

declare function glutPopWindow(): void;

declare function glutPushWindow(): void;

declare function glutIconifyWindow(): void;

declare function glutShowWindow(): void;

declare function glutHideWindow(): void;

declare function glutFullScreen(): void;

declare function glutSetCursor(cursor: number): void;

declare function glutWarpPointer(x: number, y: number): void;

declare function glutSurfaceTexture(target: number, internalformat: number, surfacewin: number): void;

declare function glutWMCloseFunc(func: () => void): void;

declare function glutCheckLoop(): void;

declare function glutEstablishOverlay(): void;

declare function glutRemoveOverlay(): void;

declare function glutUseLayer(layer: number): void;

declare function glutPostOverlayRedisplay(): void;

declare function glutPostWindowOverlayRedisplay(win: number): void;

declare function glutShowOverlay(): void;

declare function glutHideOverlay(): void;

declare function glutCreateMenu(p1: (p1: number) => void): number;

declare function glutDestroyMenu(menu: number): void;

declare function glutGetMenu(): number;

declare function glutSetMenu(menu: number): void;

declare function glutAddMenuEntry(label: string, value: number): void;

declare function glutAddSubMenu(label: string, submenu: number): void;

declare function glutChangeToMenuEntry(item: number, label: string, value: number): void;

declare function glutChangeToSubMenu(item: number, label: string, submenu: number): void;

declare function glutRemoveMenuItem(item: number): void;

declare function glutAttachMenu(button: number): void;

declare function glutDetachMenu(button: number): void;

declare function glutDisplayFunc(func: () => void): void;

declare function glutReshapeFunc(func: (p1: number, p2: number) => void): void;

declare function glutKeyboardFunc(func: (p1: number, p2: number, p3: number) => void): void;

declare function glutMouseFunc(func: (p1: number, p2: number, p3: number, p4: number) => void): void;

declare function glutMotionFunc(func: (p1: number, p2: number) => void): void;

declare function glutPassiveMotionFunc(func: (p1: number, p2: number) => void): void;

declare function glutEntryFunc(func: (p1: number) => void): void;

declare function glutVisibilityFunc(func: (p1: number) => void): void;

declare function glutIdleFunc(func: () => void): void;

declare function glutTimerFunc(millis: number, func: (p1: number) => void, value: number): void;

declare function glutMenuStateFunc(func: (p1: number) => void): void;

declare function glutSpecialFunc(func: (p1: number, p2: number, p3: number) => void): void;

declare function glutSpaceballMotionFunc(func: (p1: number, p2: number, p3: number) => void): void;

declare function glutSpaceballRotateFunc(func: (p1: number, p2: number, p3: number) => void): void;

declare function glutSpaceballButtonFunc(func: (p1: number, p2: number) => void): void;

declare function glutButtonBoxFunc(func: (p1: number, p2: number) => void): void;

declare function glutDialsFunc(func: (p1: number, p2: number) => void): void;

declare function glutTabletMotionFunc(func: (p1: number, p2: number) => void): void;

declare function glutTabletButtonFunc(func: (p1: number, p2: number, p3: number, p4: number) => void): void;

declare function glutMenuStatusFunc(func: (p1: number, p2: number, p3: number) => void): void;

declare function glutOverlayDisplayFunc(func: () => void): void;

declare function glutWindowStatusFunc(func: (p1: number) => void): void;

declare function glutKeyboardUpFunc(func: (p1: number, p2: number, p3: number) => void): void;

declare function glutSpecialUpFunc(func: (p1: number, p2: number, p3: number) => void): void;

declare function glutJoystickFunc(func: (p1: number, p2: number, p3: number, p4: number) => void, pollInterval: number): void;

declare function glutSetColor(p1: number, red: number, green: number, blue: number): void;

declare function glutGetColor(ndx: number, component: number): number;

declare function glutCopyColormap(win: number): void;

declare function glutGet(type: number): number;

declare function glutDeviceGet(type: number): number;

declare function glutExtensionSupported(name: string): number;

declare function glutGetModifiers(): number;

declare function glutLayerGet(type: number): number;

declare function glutGetProcAddress(procName: string): interop.Pointer;

declare function glutBitmapCharacter(font: interop.PointerConvertible, character: number): void;

declare function glutBitmapWidth(font: interop.PointerConvertible, character: number): number;

declare function glutStrokeCharacter(font: interop.PointerConvertible, character: number): void;

declare function glutStrokeWidth(font: interop.PointerConvertible, character: number): number;

declare function glutBitmapLength(font: interop.PointerConvertible, string: interop.PointerConvertible): number;

declare function glutStrokeLength(font: interop.PointerConvertible, string: interop.PointerConvertible): number;

declare function glutWireSphere(radius: number, slices: number, stacks: number): void;

declare function glutSolidSphere(radius: number, slices: number, stacks: number): void;

declare function glutWireCone(base: number, height: number, slices: number, stacks: number): void;

declare function glutSolidCone(base: number, height: number, slices: number, stacks: number): void;

declare function glutWireCube(size: number): void;

declare function glutSolidCube(size: number): void;

declare function glutWireTorus(innerRadius: number, outerRadius: number, sides: number, rings: number): void;

declare function glutSolidTorus(innerRadius: number, outerRadius: number, sides: number, rings: number): void;

declare function glutWireDodecahedron(): void;

declare function glutSolidDodecahedron(): void;

declare function glutWireTeapot(size: number): void;

declare function glutSolidTeapot(size: number): void;

declare function glutWireOctahedron(): void;

declare function glutSolidOctahedron(): void;

declare function glutWireTetrahedron(): void;

declare function glutSolidTetrahedron(): void;

declare function glutWireIcosahedron(): void;

declare function glutSolidIcosahedron(): void;

declare function glutVideoResizeGet(param: number): number;

declare function glutSetupVideoResizing(): void;

declare function glutStopVideoResizing(): void;

declare function glutVideoResize(x: number, y: number, width: number, height: number): void;

declare function glutVideoPan(x: number, y: number, width: number, height: number): void;

declare function glutReportErrors(): void;

declare function glutIgnoreKeyRepeat(ignore: number): void;

declare function glutSetKeyRepeat(repeatMode: number): void;

declare function glutForceJoystickFunc(): void;

declare function glutGameModeString(string: string): void;

declare function glutEnterGameMode(): number;

declare function glutLeaveGameMode(): void;

declare function glutGameModeGet(mode: number): number;

declare function up_sanity_check(up: unknown /* const array */, npoints: number, point_array: interop.Pointer): void;

declare function draw_raw_style_end_cap(ncp: number, contour: interop.Pointer, zval: number, frontwards: number): void;

declare function draw_round_style_cap_callback(iloop: number, cap: interop.Pointer, face_color: unknown /* const array */, cut_vector: unknown /* const array */, bisect_vector: unknown /* const array */, norms: interop.Pointer, frontwards: number): void;

declare function draw_angle_style_front_cap(ncp: number, bi: unknown /* const array */, point_array: interop.Pointer): void;

declare function extrusion_raw_join(ncp: number, contour: interop.Pointer, cont_normal: interop.Pointer, up: unknown /* const array */, npoints: number, point_array: interop.Pointer, color_array: interop.Pointer, xform_array: interop.Pointer): void;

declare function extrusion_round_or_cut_join(ncp: number, contour: interop.Pointer, cont_normal: interop.Pointer, up: unknown /* const array */, npoints: number, point_array: interop.Pointer, color_array: interop.Pointer, xform_array: interop.Pointer): void;

declare function extrusion_angle_join(ncp: number, contour: interop.Pointer, cont_normal: interop.Pointer, up: unknown /* const array */, npoints: number, point_array: interop.Pointer, color_array: interop.Pointer, xform_array: interop.Pointer): void;

declare function rot_axis_f(omega: number, axis: unknown /* const array */): void;

declare function rot_about_axis_f(angle: number, axis: unknown /* const array */): void;

declare function rot_omega_f(axis: unknown /* const array */): void;

declare function urot_axis_f(m: unknown /* const array */, omega: number, axis: unknown /* const array */): void;

declare function urot_about_axis_f(m: unknown /* const array */, angle: number, axis: unknown /* const array */): void;

declare function urot_omega_f(m: unknown /* const array */, axis: unknown /* const array */): void;

declare function rot_axis_d(omega: number, axis: unknown /* const array */): void;

declare function rot_about_axis_d(angle: number, axis: unknown /* const array */): void;

declare function rot_omega_d(axis: unknown /* const array */): void;

declare function urot_axis_d(m: unknown /* const array */, omega: number, axis: unknown /* const array */): void;

declare function urot_about_axis_d(m: unknown /* const array */, angle: number, axis: unknown /* const array */): void;

declare function urot_omega_d(m: unknown /* const array */, axis: unknown /* const array */): void;

declare function uview_direction_d(m: unknown /* const array */, v21: unknown /* const array */, up: unknown /* const array */): void;

declare function uview_direction_f(m: unknown /* const array */, v21: unknown /* const array */, up: unknown /* const array */): void;

declare function uviewpoint_d(m: unknown /* const array */, v1: unknown /* const array */, v2: unknown /* const array */, up: unknown /* const array */): void;

declare function uviewpoint_f(m: unknown /* const array */, v1: unknown /* const array */, v2: unknown /* const array */, up: unknown /* const array */): void;

declare function smapCreateSphereMap(shareSmap: interop.PointerConvertible): interop.Pointer;

declare function smapDestroySphereMap(smap: interop.PointerConvertible): void;

declare function smapConfigureSphereMapMesh(smap: interop.PointerConvertible, steps: number, rings: number, edgeExtend: number): void;

declare function smapSetSphereMapTexObj(smap: interop.PointerConvertible, texobj: number): void;

declare function smapSetViewTexObj(smap: interop.PointerConvertible, texobj: number): void;

declare function smapSetViewTexObjs(smap: interop.PointerConvertible, texobjs: unknown /* const array */): void;

declare function smapGetSphereMapTexObj(smap: interop.PointerConvertible, texobj: interop.PointerConvertible): void;

declare function smapGetViewTexObj(smap: interop.PointerConvertible, texobj: interop.PointerConvertible): void;

declare function smapGetViewTexObjs(smap: interop.PointerConvertible, texobjs: unknown /* const array */): void;

declare function smapSetFlags(smap: interop.PointerConvertible, flags: interop.Enum<typeof SphereMapFlags>): void;

declare function smapGetFlags(smap: interop.PointerConvertible, flags: interop.PointerConvertible): void;

declare function smapSetViewOrigin(smap: interop.PointerConvertible, x: number, y: number): void;

declare function smapSetSphereMapOrigin(smap: interop.PointerConvertible, x: number, y: number): void;

declare function smapGetViewOrigin(smap: interop.PointerConvertible, x: interop.PointerConvertible, y: interop.PointerConvertible): void;

declare function smapGetSphereMapOrigin(smap: interop.PointerConvertible, x: interop.PointerConvertible, y: interop.PointerConvertible): void;

declare function smapSetEye(smap: interop.PointerConvertible, eyex: number, eyey: number, eyez: number): void;

declare function smapSetEyeVector(smap: interop.PointerConvertible, eye: interop.PointerConvertible): void;

declare function smapSetUp(smap: interop.PointerConvertible, upx: number, upy: number, upz: number): void;

declare function smapSetUpVector(smap: interop.PointerConvertible, up: interop.PointerConvertible): void;

declare function smapSetObject(smap: interop.PointerConvertible, objx: number, objy: number, objz: number): void;

declare function smapSetObjectVector(smap: interop.PointerConvertible, obj: interop.PointerConvertible): void;

declare function smapGetEye(smap: interop.PointerConvertible, eyex: interop.PointerConvertible, eyey: interop.PointerConvertible, eyez: interop.PointerConvertible): void;

declare function smapGetEyeVector(smap: interop.PointerConvertible, eye: interop.PointerConvertible): void;

declare function smapGetUp(smap: interop.PointerConvertible, upx: interop.PointerConvertible, upy: interop.PointerConvertible, upz: interop.PointerConvertible): void;

declare function smapGetUpVector(smap: interop.PointerConvertible, up: interop.PointerConvertible): void;

declare function smapGetObject(smap: interop.PointerConvertible, objx: interop.PointerConvertible, objy: interop.PointerConvertible, objz: interop.PointerConvertible): void;

declare function smapGetObjectVector(smap: interop.PointerConvertible, obj: interop.PointerConvertible): void;

declare function smapSetNearFar(smap: interop.PointerConvertible, viewNear: number, viewFar: number): void;

declare function smapGetNearFar(smap: interop.PointerConvertible, viewNear: interop.PointerConvertible, viewFar: interop.PointerConvertible): void;

declare function smapSetSphereMapTexDim(smap: interop.PointerConvertible, texdim: number): void;

declare function smapSetViewTexDim(smap: interop.PointerConvertible, texdim: number): void;

declare function smapGetSphereMapTexDim(smap: interop.PointerConvertible, texdim: interop.PointerConvertible): void;

declare function smapGetViewTexDim(smap: interop.PointerConvertible, texdim: interop.PointerConvertible): void;

declare function smapSetContextData(smap: interop.PointerConvertible, context: interop.PointerConvertible): void;

declare function smapGetContextData(smap: interop.PointerConvertible, context: interop.PointerConvertible): void;

declare function smapSetPositionLightsFunc(smap: interop.PointerConvertible, positionLights: (p1: number, p2: interop.PointerConvertible) => void): void;

declare function smapSetDrawViewFunc(smap: interop.PointerConvertible, drawView: (p1: number, p2: interop.PointerConvertible) => void): void;

declare function smapGetPositionLightsFunc(smap: interop.PointerConvertible, positionLights: interop.PointerConvertible): void;

declare function smapGetDrawViewFunc(smap: interop.PointerConvertible, drawView: interop.PointerConvertible): void;

declare function smapGenViewTex(smap: interop.PointerConvertible, view: number): void;

declare function smapGenViewTexs(smap: interop.PointerConvertible): void;

declare function smapGenSphereMapFromViewTexs(smap: interop.PointerConvertible): void;

declare function smapGenSphereMap(smap: interop.PointerConvertible): void;

declare function smapGenSphereMapWithOneViewTex(smap: interop.PointerConvertible): void;

declare function smapRvecToSt(rvec: unknown /* const array */, st: unknown /* const array */): number;

declare function smapStToRvec(st: interop.PointerConvertible, rvec: interop.PointerConvertible): void;

declare function gleGetJoinStyle(): number;

declare function gleSetJoinStyle(style: number): void;

declare function gleGetNumSlices(): number;

declare function gleSetNumSlices(slices: number): void;

declare function glePolyCylinder(npoints: number, point_array: interop.Pointer, color_array: interop.Pointer, radius: number): void;

declare function glePolyCone(npoints: number, point_array: interop.Pointer, color_array: interop.Pointer, radius_array: interop.Pointer): void;

declare function gleExtrusion(ncp: number, contour: interop.Pointer, cont_normal: interop.Pointer, up: unknown /* const array */, npoints: number, point_array: interop.Pointer, color_array: interop.Pointer): void;

declare function gleTwistExtrusion(ncp: number, contour: interop.Pointer, cont_normal: interop.Pointer, up: unknown /* const array */, npoints: number, point_array: interop.Pointer, color_array: interop.Pointer, twist_array: interop.Pointer): void;

declare function gleSuperExtrusion(ncp: number, contour: interop.Pointer, cont_normal: interop.Pointer, up: unknown /* const array */, npoints: number, point_array: interop.Pointer, color_array: interop.Pointer, xform_array: interop.Pointer): void;

declare function gleSpiral(ncp: number, contour: interop.Pointer, cont_normal: interop.Pointer, up: unknown /* const array */, startRadius: number, drdTheta: number, startZ: number, dzdTheta: number, startXform: unknown /* const array */, dXformdTheta: unknown /* const array */, startTheta: number, sweepTheta: number): void;

declare function gleLathe(ncp: number, contour: interop.Pointer, cont_normal: interop.Pointer, up: unknown /* const array */, startRadius: number, drdTheta: number, startZ: number, dzdTheta: number, startXform: unknown /* const array */, dXformdTheta: unknown /* const array */, startTheta: number, sweepTheta: number): void;

declare function gleHelicoid(rToroid: number, startRadius: number, drdTheta: number, startZ: number, dzdTheta: number, startXform: unknown /* const array */, dXformdTheta: unknown /* const array */, startTheta: number, sweepTheta: number): void;

declare function gleToroid(rToroid: number, startRadius: number, drdTheta: number, startZ: number, dzdTheta: number, startXform: unknown /* const array */, dXformdTheta: unknown /* const array */, startTheta: number, sweepTheta: number): void;

declare function gleScrew(ncp: number, contour: interop.Pointer, cont_normal: interop.Pointer, up: unknown /* const array */, startz: number, endz: number, twist: number): void;

declare function gleTextureMode(mode: number): void;

declare function draw_segment_plain(ncp: number, front_contour: interop.Pointer, back_contour: interop.Pointer, inext: number, len: number): void;

declare function draw_segment_color(ncp: number, front_contour: interop.Pointer, back_contour: interop.Pointer, color_last: unknown /* const array */, color_next: unknown /* const array */, inext: number, len: number): void;

declare function draw_segment_edge_n(ncp: number, front_contour: interop.Pointer, back_contour: interop.Pointer, norm_cont: interop.Pointer, inext: number, len: number): void;

declare function draw_segment_c_and_edge_n(ncp: number, front_contour: interop.Pointer, back_contour: interop.Pointer, norm_cont: interop.Pointer, color_last: unknown /* const array */, color_next: unknown /* const array */, inext: number, len: number): void;

declare function draw_segment_facet_n(ncp: number, front_contour: interop.Pointer, back_contour: interop.Pointer, norm_cont: interop.Pointer, inext: number, len: number): void;

declare function draw_segment_c_and_facet_n(ncp: number, front_contour: interop.Pointer, back_contour: interop.Pointer, norm_cont: interop.Pointer, color_last: unknown /* const array */, color_next: unknown /* const array */, inext: number, len: number): void;

declare function draw_binorm_segment_edge_n(ncp: number, front_contour: interop.Pointer, back_contour: interop.Pointer, front_norm: interop.Pointer, back_norm: interop.Pointer, inext: number, len: number): void;

declare function draw_binorm_segment_c_and_edge_n(ncp: number, front_contour: interop.Pointer, back_contour: interop.Pointer, front_norm: interop.Pointer, back_norm: interop.Pointer, color_last: unknown /* const array */, color_next: unknown /* const array */, inext: number, len: number): void;

declare function draw_binorm_segment_facet_n(ncp: number, front_contour: interop.Pointer, back_contour: interop.Pointer, front_norm: interop.Pointer, back_norm: interop.Pointer, inext: number, len: number): void;

declare function draw_binorm_segment_c_and_facet_n(ncp: number, front_contour: interop.Pointer, back_contour: interop.Pointer, front_norm: interop.Pointer, back_norm: interop.Pointer, color_last: unknown /* const array */, color_next: unknown /* const array */, inext: number, len: number): void;

declare function draw_angle_style_back_cap(ncp: number, bi: unknown /* const array */, point_array: interop.Pointer): void;

declare function __smapDrawSphereMapMeshSide(mesh: interop.PointerConvertible, side: number): void;

declare function __smapDrawSphereMapMeshBack(mesh: interop.PointerConvertible): void;

declare function __smapValidateSphereMapMesh(mesh: interop.PointerConvertible): void;

declare function gleCreateGC(): interop.Pointer;

declare function bisecting_plane(n: unknown /* const array */, v1: unknown /* const array */, v2: unknown /* const array */, v3: unknown /* const array */): number;

declare function __glutGetFCB(which: number): interop.Pointer;

declare function __glutSetFCB(which: number, func: interop.PointerConvertible): void;

