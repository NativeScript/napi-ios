/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const kEAGLColorFormatRGB565: string;

declare const kEAGLDrawablePropertyRetainedBacking: string;

declare const kEAGLColorFormatRGBA8: string;

declare const kEAGLDrawablePropertyColorFormat: string;

declare const kEAGLColorFormatSRGBA8: string;

declare const EAGLRenderingAPI: {
  S1: 1,
  S2: 2,
  S3: 3,
};

declare class __GLsync {
  constructor(init?: __GLsync);
}

declare function EAGLGetVersion(major: interop.PointerConvertible, minor: interop.PointerConvertible): void;

declare function glActiveTexture(texture: number): void;

declare function glAttachShader(program: number, shader: number): void;

declare function glBindAttribLocation(program: number, index: number, name: string): void;

declare function glBindBuffer(target: number, buffer: number): void;

declare function glBindFramebuffer(target: number, framebuffer: number): void;

declare function glBindRenderbuffer(target: number, renderbuffer: number): void;

declare function glBindTexture(target: number, texture: number): void;

declare function glBlendColor(red: number, green: number, blue: number, alpha: number): void;

declare function glBlendEquation(mode: number): void;

declare function glBlendEquationSeparate(modeRGB: number, modeAlpha: number): void;

declare function glBlendFunc(sfactor: number, dfactor: number): void;

declare function glBlendFuncSeparate(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number): void;

declare function glBufferData(target: number, size: number, data: interop.PointerConvertible, usage: number): void;

declare function glBufferSubData(target: number, offset: number, size: number, data: interop.PointerConvertible): void;

declare function glCheckFramebufferStatus(target: number): number;

declare function glClear(mask: number): void;

declare function glClearColor(red: number, green: number, blue: number, alpha: number): void;

declare function glClearDepthf(depth: number): void;

declare function glClearStencil(s: number): void;

declare function glColorMask(red: number, green: number, blue: number, alpha: number): void;

declare function glCompileShader(shader: number): void;

declare function glCompressedTexImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, imageSize: number, data: interop.PointerConvertible): void;

declare function glCompressedTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, imageSize: number, data: interop.PointerConvertible): void;

declare function glCopyTexImage2D(target: number, level: number, internalformat: number, x: number, y: number, width: number, height: number, border: number): void;

declare function glCopyTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, x: number, y: number, width: number, height: number): void;

declare function glCreateProgram(): number;

declare function glCreateShader(type: number): number;

declare function glCullFace(mode: number): void;

declare function glDeleteBuffers(n: number, buffers: interop.PointerConvertible): void;

declare function glDeleteFramebuffers(n: number, framebuffers: interop.PointerConvertible): void;

declare function glDeleteProgram(program: number): void;

declare function glDeleteRenderbuffers(n: number, renderbuffers: interop.PointerConvertible): void;

declare function glDeleteShader(shader: number): void;

declare function glDeleteTextures(n: number, textures: interop.PointerConvertible): void;

declare function glDepthFunc(func: number): void;

declare function glDepthMask(flag: number): void;

declare function glDepthRangef(zNear: number, zFar: number): void;

declare function glDetachShader(program: number, shader: number): void;

declare function glDisable(cap: number): void;

declare function glDisableVertexAttribArray(index: number): void;

declare function glDrawArrays(mode: number, first: number, count: number): void;

declare function glDrawElements(mode: number, count: number, type: number, indices: interop.PointerConvertible): void;

declare function glEnable(cap: number): void;

declare function glEnableVertexAttribArray(index: number): void;

declare function glFinish(): void;

declare function glFlush(): void;

declare function glFramebufferRenderbuffer(target: number, attachment: number, renderbuffertarget: number, renderbuffer: number): void;

declare function glFramebufferTexture2D(target: number, attachment: number, textarget: number, texture: number, level: number): void;

declare function glFrontFace(mode: number): void;

declare function glGenBuffers(n: number, buffers: interop.PointerConvertible): void;

declare function glGenerateMipmap(target: number): void;

declare function glGenFramebuffers(n: number, framebuffers: interop.PointerConvertible): void;

declare function glGenRenderbuffers(n: number, renderbuffers: interop.PointerConvertible): void;

declare function glGenTextures(n: number, textures: interop.PointerConvertible): void;

declare function glGetActiveAttrib(program: number, index: number, bufsize: number, length: interop.PointerConvertible, size: interop.PointerConvertible, type: interop.PointerConvertible, name: string): void;

declare function glGetActiveUniform(program: number, index: number, bufsize: number, length: interop.PointerConvertible, size: interop.PointerConvertible, type: interop.PointerConvertible, name: string): void;

declare function glGetAttachedShaders(program: number, maxcount: number, count: interop.PointerConvertible, shaders: interop.PointerConvertible): void;

declare function glGetAttribLocation(program: number, name: string): number;

declare function glGetBooleanv(pname: number, params: interop.PointerConvertible): void;

declare function glGetBufferParameteriv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetError(): number;

declare function glGetFloatv(pname: number, params: interop.PointerConvertible): void;

declare function glGetFramebufferAttachmentParameteriv(target: number, attachment: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetIntegerv(pname: number, params: interop.PointerConvertible): void;

declare function glGetProgramiv(program: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetProgramInfoLog(program: number, bufsize: number, length: interop.PointerConvertible, infolog: string): void;

declare function glGetRenderbufferParameteriv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetShaderiv(shader: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetShaderInfoLog(shader: number, bufsize: number, length: interop.PointerConvertible, infolog: string): void;

declare function glGetShaderPrecisionFormat(shadertype: number, precisiontype: number, range: interop.PointerConvertible, precision: interop.PointerConvertible): void;

declare function glGetShaderSource(shader: number, bufsize: number, length: interop.PointerConvertible, source: string): void;

declare function glGetString(name: number): interop.Pointer;

declare function glGetTexParameterfv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetTexParameteriv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetUniformfv(program: number, location: number, params: interop.PointerConvertible): void;

declare function glGetUniformiv(program: number, location: number, params: interop.PointerConvertible): void;

declare function glGetUniformLocation(program: number, name: string): number;

declare function glGetVertexAttribfv(index: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetVertexAttribiv(index: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetVertexAttribPointerv(index: number, pname: number, pointer: interop.PointerConvertible): void;

declare function glHint(target: number, mode: number): void;

declare function glIsBuffer(buffer: number): number;

declare function glIsEnabled(cap: number): number;

declare function glIsFramebuffer(framebuffer: number): number;

declare function glIsProgram(program: number): number;

declare function glIsRenderbuffer(renderbuffer: number): number;

declare function glIsShader(shader: number): number;

declare function glIsTexture(texture: number): number;

declare function glLineWidth(width: number): void;

declare function glLinkProgram(program: number): void;

declare function glPixelStorei(pname: number, param: number): void;

declare function glPolygonOffset(factor: number, units: number): void;

declare function glReadPixels(x: number, y: number, width: number, height: number, format: number, type: number, pixels: interop.PointerConvertible): void;

declare function glReleaseShaderCompiler(): void;

declare function glRenderbufferStorage(target: number, internalformat: number, width: number, height: number): void;

declare function glSampleCoverage(value: number, invert: number): void;

declare function glScissor(x: number, y: number, width: number, height: number): void;

declare function glShaderBinary(n: number, shaders: interop.PointerConvertible, binaryformat: number, binary: interop.PointerConvertible, length: number): void;

declare function glShaderSource(shader: number, count: number, string: interop.PointerConvertible, length: interop.PointerConvertible): void;

declare function glStencilFunc(func: number, ref: number, mask: number): void;

declare function glStencilFuncSeparate(face: number, func: number, ref: number, mask: number): void;

declare function glStencilMask(mask: number): void;

declare function glStencilMaskSeparate(face: number, mask: number): void;

declare function glStencilOp(fail: number, zfail: number, zpass: number): void;

declare function glStencilOpSeparate(face: number, fail: number, zfail: number, zpass: number): void;

declare function glTexImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, format: number, type: number, pixels: interop.PointerConvertible): void;

declare function glTexParameterf(target: number, pname: number, param: number): void;

declare function glTexParameterfv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glTexParameteri(target: number, pname: number, param: number): void;

declare function glTexParameteriv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, type: number, pixels: interop.PointerConvertible): void;

declare function glUniform1f(location: number, x: number): void;

declare function glUniform1fv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniform1i(location: number, x: number): void;

declare function glUniform1iv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniform2f(location: number, x: number, y: number): void;

declare function glUniform2fv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniform2i(location: number, x: number, y: number): void;

declare function glUniform2iv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniform3f(location: number, x: number, y: number, z: number): void;

declare function glUniform3fv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniform3i(location: number, x: number, y: number, z: number): void;

declare function glUniform3iv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniform4f(location: number, x: number, y: number, z: number, w: number): void;

declare function glUniform4fv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniform4i(location: number, x: number, y: number, z: number, w: number): void;

declare function glUniform4iv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniformMatrix2fv(location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glUniformMatrix3fv(location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glUniformMatrix4fv(location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glUseProgram(program: number): void;

declare function glValidateProgram(program: number): void;

declare function glVertexAttrib1f(indx: number, x: number): void;

declare function glVertexAttrib1fv(indx: number, values: interop.PointerConvertible): void;

declare function glVertexAttrib2f(indx: number, x: number, y: number): void;

declare function glVertexAttrib2fv(indx: number, values: interop.PointerConvertible): void;

declare function glVertexAttrib3f(indx: number, x: number, y: number, z: number): void;

declare function glVertexAttrib3fv(indx: number, values: interop.PointerConvertible): void;

declare function glVertexAttrib4f(indx: number, x: number, y: number, z: number, w: number): void;

declare function glVertexAttrib4fv(indx: number, values: interop.PointerConvertible): void;

declare function glVertexAttribPointer(indx: number, size: number, type: number, normalized: number, stride: number, ptr: interop.PointerConvertible): void;

declare function glViewport(x: number, y: number, width: number, height: number): void;

declare function glCopyTextureLevelsAPPLE(destinationTexture: number, sourceTexture: number, sourceBaseLevel: number, sourceLevelCount: number): void;

declare function glRenderbufferStorageMultisampleAPPLE(target: number, samples: number, internalformat: number, width: number, height: number): void;

declare function glResolveMultisampleFramebufferAPPLE(): void;

declare function glFenceSyncAPPLE(condition: number, flags: number): interop.Pointer;

declare function glIsSyncAPPLE(sync: interop.PointerConvertible): number;

declare function glDeleteSyncAPPLE(sync: interop.PointerConvertible): void;

declare function glClientWaitSyncAPPLE(sync: interop.PointerConvertible, flags: number, timeout: number): number;

declare function glWaitSyncAPPLE(sync: interop.PointerConvertible, flags: number, timeout: number): void;

declare function glGetInteger64vAPPLE(pname: number, params: interop.PointerConvertible): void;

declare function glGetSyncivAPPLE(sync: interop.PointerConvertible, pname: number, bufSize: number, length: interop.PointerConvertible, values: interop.PointerConvertible): void;

declare function glLabelObjectEXT(type: number, object: number, length: number, label: string): void;

declare function glGetObjectLabelEXT(type: number, object: number, bufSize: number, length: interop.PointerConvertible, label: string): void;

declare function glInsertEventMarkerEXT(length: number, marker: string): void;

declare function glPushGroupMarkerEXT(length: number, marker: string): void;

declare function glPopGroupMarkerEXT(): void;

declare function glDiscardFramebufferEXT(target: number, numAttachments: number, attachments: interop.PointerConvertible): void;

declare function glDrawArraysInstancedEXT(mode: number, first: number, count: number, instanceCount: number): void;

declare function glDrawElementsInstancedEXT(mode: number, count: number, type: number, indices: interop.PointerConvertible, instanceCount: number): void;

declare function glVertexAttribDivisorEXT(index: number, divisor: number): void;

declare function glMapBufferRangeEXT(target: number, offset: number, length: number, access: number): interop.Pointer;

declare function glFlushMappedBufferRangeEXT(target: number, offset: number, length: number): void;

declare function glGenQueriesEXT(n: number, ids: interop.PointerConvertible): void;

declare function glDeleteQueriesEXT(n: number, ids: interop.PointerConvertible): void;

declare function glIsQueryEXT(id: number): number;

declare function glBeginQueryEXT(target: number, id: number): void;

declare function glEndQueryEXT(target: number): void;

declare function glGetQueryivEXT(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetQueryObjectuivEXT(id: number, pname: number, params: interop.PointerConvertible): void;

declare function glUseProgramStagesEXT(pipeline: number, stages: number, program: number): void;

declare function glActiveShaderProgramEXT(pipeline: number, program: number): void;

declare function glCreateShaderProgramvEXT(type: number, count: number, strings: interop.PointerConvertible): number;

declare function glBindProgramPipelineEXT(pipeline: number): void;

declare function glDeleteProgramPipelinesEXT(n: number, pipelines: interop.PointerConvertible): void;

declare function glGenProgramPipelinesEXT(n: number, pipelines: interop.PointerConvertible): void;

declare function glIsProgramPipelineEXT(pipeline: number): number;

declare function glProgramParameteriEXT(program: number, pname: number, value: number): void;

declare function glGetProgramPipelineivEXT(pipeline: number, pname: number, params: interop.PointerConvertible): void;

declare function glValidateProgramPipelineEXT(pipeline: number): void;

declare function glGetProgramPipelineInfoLogEXT(pipeline: number, bufSize: number, length: interop.PointerConvertible, infoLog: string): void;

declare function glProgramUniform1iEXT(program: number, location: number, x: number): void;

declare function glProgramUniform2iEXT(program: number, location: number, x: number, y: number): void;

declare function glProgramUniform3iEXT(program: number, location: number, x: number, y: number, z: number): void;

declare function glProgramUniform4iEXT(program: number, location: number, x: number, y: number, z: number, w: number): void;

declare function glProgramUniform1fEXT(program: number, location: number, x: number): void;

declare function glProgramUniform2fEXT(program: number, location: number, x: number, y: number): void;

declare function glProgramUniform3fEXT(program: number, location: number, x: number, y: number, z: number): void;

declare function glProgramUniform4fEXT(program: number, location: number, x: number, y: number, z: number, w: number): void;

declare function glProgramUniform1ivEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform2ivEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform3ivEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform4ivEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform1fvEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform2fvEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform3fvEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform4fvEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniformMatrix2fvEXT(program: number, location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glProgramUniformMatrix3fvEXT(program: number, location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glProgramUniformMatrix4fvEXT(program: number, location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glTexStorage2DEXT(target: number, levels: number, internalformat: number, width: number, height: number): void;

declare function glGetBufferPointervOES(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glMapBufferOES(target: number, access: number): interop.Pointer;

declare function glUnmapBufferOES(target: number): number;

declare function glBindVertexArrayOES(array: number): void;

declare function glDeleteVertexArraysOES(n: number, arrays: interop.PointerConvertible): void;

declare function glGenVertexArraysOES(n: number, arrays: interop.PointerConvertible): void;

declare function glIsVertexArrayOES(array: number): number;

declare function glActiveTexture(texture: number): void;

declare function glAttachShader(program: number, shader: number): void;

declare function glBindAttribLocation(program: number, index: number, name: string): void;

declare function glBindBuffer(target: number, buffer: number): void;

declare function glBindFramebuffer(target: number, framebuffer: number): void;

declare function glBindRenderbuffer(target: number, renderbuffer: number): void;

declare function glBindTexture(target: number, texture: number): void;

declare function glBlendColor(red: number, green: number, blue: number, alpha: number): void;

declare function glBlendEquation(mode: number): void;

declare function glBlendEquationSeparate(modeRGB: number, modeAlpha: number): void;

declare function glBlendFunc(sfactor: number, dfactor: number): void;

declare function glBlendFuncSeparate(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number): void;

declare function glBufferData(target: number, size: number, data: interop.PointerConvertible, usage: number): void;

declare function glBufferSubData(target: number, offset: number, size: number, data: interop.PointerConvertible): void;

declare function glCheckFramebufferStatus(target: number): number;

declare function glClear(mask: number): void;

declare function glClearColor(red: number, green: number, blue: number, alpha: number): void;

declare function glClearDepthf(depth: number): void;

declare function glClearStencil(s: number): void;

declare function glColorMask(red: number, green: number, blue: number, alpha: number): void;

declare function glCompileShader(shader: number): void;

declare function glCompressedTexImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, imageSize: number, data: interop.PointerConvertible): void;

declare function glCompressedTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, imageSize: number, data: interop.PointerConvertible): void;

declare function glCopyTexImage2D(target: number, level: number, internalformat: number, x: number, y: number, width: number, height: number, border: number): void;

declare function glCopyTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, x: number, y: number, width: number, height: number): void;

declare function glCreateProgram(): number;

declare function glCreateShader(type: number): number;

declare function glCullFace(mode: number): void;

declare function glDeleteBuffers(n: number, buffers: interop.PointerConvertible): void;

declare function glDeleteFramebuffers(n: number, framebuffers: interop.PointerConvertible): void;

declare function glDeleteProgram(program: number): void;

declare function glDeleteRenderbuffers(n: number, renderbuffers: interop.PointerConvertible): void;

declare function glDeleteShader(shader: number): void;

declare function glDeleteTextures(n: number, textures: interop.PointerConvertible): void;

declare function glDepthFunc(func: number): void;

declare function glDepthMask(flag: number): void;

declare function glDepthRangef(zNear: number, zFar: number): void;

declare function glDetachShader(program: number, shader: number): void;

declare function glDisable(cap: number): void;

declare function glDisableVertexAttribArray(index: number): void;

declare function glDrawArrays(mode: number, first: number, count: number): void;

declare function glDrawElements(mode: number, count: number, type: number, indices: interop.PointerConvertible): void;

declare function glEnable(cap: number): void;

declare function glEnableVertexAttribArray(index: number): void;

declare function glFinish(): void;

declare function glFlush(): void;

declare function glFramebufferRenderbuffer(target: number, attachment: number, renderbuffertarget: number, renderbuffer: number): void;

declare function glFramebufferTexture2D(target: number, attachment: number, textarget: number, texture: number, level: number): void;

declare function glFrontFace(mode: number): void;

declare function glGenBuffers(n: number, buffers: interop.PointerConvertible): void;

declare function glGenerateMipmap(target: number): void;

declare function glGenFramebuffers(n: number, framebuffers: interop.PointerConvertible): void;

declare function glGenRenderbuffers(n: number, renderbuffers: interop.PointerConvertible): void;

declare function glGenTextures(n: number, textures: interop.PointerConvertible): void;

declare function glGetActiveAttrib(program: number, index: number, bufsize: number, length: interop.PointerConvertible, size: interop.PointerConvertible, type: interop.PointerConvertible, name: string): void;

declare function glGetActiveUniform(program: number, index: number, bufsize: number, length: interop.PointerConvertible, size: interop.PointerConvertible, type: interop.PointerConvertible, name: string): void;

declare function glGetAttachedShaders(program: number, maxcount: number, count: interop.PointerConvertible, shaders: interop.PointerConvertible): void;

declare function glGetAttribLocation(program: number, name: string): number;

declare function glGetBooleanv(pname: number, params: interop.PointerConvertible): void;

declare function glGetBufferParameteriv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetError(): number;

declare function glGetFloatv(pname: number, params: interop.PointerConvertible): void;

declare function glGetFramebufferAttachmentParameteriv(target: number, attachment: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetIntegerv(pname: number, params: interop.PointerConvertible): void;

declare function glGetProgramiv(program: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetProgramInfoLog(program: number, bufsize: number, length: interop.PointerConvertible, infolog: string): void;

declare function glGetRenderbufferParameteriv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetShaderiv(shader: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetShaderInfoLog(shader: number, bufsize: number, length: interop.PointerConvertible, infolog: string): void;

declare function glGetShaderPrecisionFormat(shadertype: number, precisiontype: number, range: interop.PointerConvertible, precision: interop.PointerConvertible): void;

declare function glGetShaderSource(shader: number, bufsize: number, length: interop.PointerConvertible, source: string): void;

declare function glGetString(name: number): interop.Pointer;

declare function glGetTexParameterfv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetTexParameteriv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetUniformfv(program: number, location: number, params: interop.PointerConvertible): void;

declare function glGetUniformiv(program: number, location: number, params: interop.PointerConvertible): void;

declare function glGetUniformLocation(program: number, name: string): number;

declare function glGetVertexAttribfv(index: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetVertexAttribiv(index: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetVertexAttribPointerv(index: number, pname: number, pointer: interop.PointerConvertible): void;

declare function glHint(target: number, mode: number): void;

declare function glIsBuffer(buffer: number): number;

declare function glIsEnabled(cap: number): number;

declare function glIsFramebuffer(framebuffer: number): number;

declare function glIsProgram(program: number): number;

declare function glIsRenderbuffer(renderbuffer: number): number;

declare function glIsShader(shader: number): number;

declare function glIsTexture(texture: number): number;

declare function glLineWidth(width: number): void;

declare function glLinkProgram(program: number): void;

declare function glPixelStorei(pname: number, param: number): void;

declare function glPolygonOffset(factor: number, units: number): void;

declare function glReadPixels(x: number, y: number, width: number, height: number, format: number, type: number, pixels: interop.PointerConvertible): void;

declare function glReleaseShaderCompiler(): void;

declare function glRenderbufferStorage(target: number, internalformat: number, width: number, height: number): void;

declare function glSampleCoverage(value: number, invert: number): void;

declare function glScissor(x: number, y: number, width: number, height: number): void;

declare function glShaderBinary(n: number, shaders: interop.PointerConvertible, binaryformat: number, binary: interop.PointerConvertible, length: number): void;

declare function glShaderSource(shader: number, count: number, string: interop.PointerConvertible, length: interop.PointerConvertible): void;

declare function glStencilFunc(func: number, ref: number, mask: number): void;

declare function glStencilFuncSeparate(face: number, func: number, ref: number, mask: number): void;

declare function glStencilMask(mask: number): void;

declare function glStencilMaskSeparate(face: number, mask: number): void;

declare function glStencilOp(fail: number, zfail: number, zpass: number): void;

declare function glStencilOpSeparate(face: number, fail: number, zfail: number, zpass: number): void;

declare function glTexImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, format: number, type: number, pixels: interop.PointerConvertible): void;

declare function glTexParameterf(target: number, pname: number, param: number): void;

declare function glTexParameterfv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glTexParameteri(target: number, pname: number, param: number): void;

declare function glTexParameteriv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, type: number, pixels: interop.PointerConvertible): void;

declare function glUniform1f(location: number, x: number): void;

declare function glUniform1fv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniform1i(location: number, x: number): void;

declare function glUniform1iv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniform2f(location: number, x: number, y: number): void;

declare function glUniform2fv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniform2i(location: number, x: number, y: number): void;

declare function glUniform2iv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniform3f(location: number, x: number, y: number, z: number): void;

declare function glUniform3fv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniform3i(location: number, x: number, y: number, z: number): void;

declare function glUniform3iv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniform4f(location: number, x: number, y: number, z: number, w: number): void;

declare function glUniform4fv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniform4i(location: number, x: number, y: number, z: number, w: number): void;

declare function glUniform4iv(location: number, count: number, v: interop.PointerConvertible): void;

declare function glUniformMatrix2fv(location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glUniformMatrix3fv(location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glUniformMatrix4fv(location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glUseProgram(program: number): void;

declare function glValidateProgram(program: number): void;

declare function glVertexAttrib1f(indx: number, x: number): void;

declare function glVertexAttrib1fv(indx: number, values: interop.PointerConvertible): void;

declare function glVertexAttrib2f(indx: number, x: number, y: number): void;

declare function glVertexAttrib2fv(indx: number, values: interop.PointerConvertible): void;

declare function glVertexAttrib3f(indx: number, x: number, y: number, z: number): void;

declare function glVertexAttrib3fv(indx: number, values: interop.PointerConvertible): void;

declare function glVertexAttrib4f(indx: number, x: number, y: number, z: number, w: number): void;

declare function glVertexAttrib4fv(indx: number, values: interop.PointerConvertible): void;

declare function glVertexAttribPointer(indx: number, size: number, type: number, normalized: number, stride: number, ptr: interop.PointerConvertible): void;

declare function glViewport(x: number, y: number, width: number, height: number): void;

declare function glReadBuffer(mode: number): void;

declare function glDrawRangeElements(mode: number, start: number, end: number, count: number, type: number, indices: interop.PointerConvertible): void;

declare function glTexImage3D(target: number, level: number, internalformat: number, width: number, height: number, depth: number, border: number, format: number, type: number, pixels: interop.PointerConvertible): void;

declare function glTexSubImage3D(target: number, level: number, xoffset: number, yoffset: number, zoffset: number, width: number, height: number, depth: number, format: number, type: number, pixels: interop.PointerConvertible): void;

declare function glCopyTexSubImage3D(target: number, level: number, xoffset: number, yoffset: number, zoffset: number, x: number, y: number, width: number, height: number): void;

declare function glCompressedTexImage3D(target: number, level: number, internalformat: number, width: number, height: number, depth: number, border: number, imageSize: number, data: interop.PointerConvertible): void;

declare function glCompressedTexSubImage3D(target: number, level: number, xoffset: number, yoffset: number, zoffset: number, width: number, height: number, depth: number, format: number, imageSize: number, data: interop.PointerConvertible): void;

declare function glGenQueries(n: number, ids: interop.PointerConvertible): void;

declare function glDeleteQueries(n: number, ids: interop.PointerConvertible): void;

declare function glIsQuery(id: number): number;

declare function glBeginQuery(target: number, id: number): void;

declare function glEndQuery(target: number): void;

declare function glGetQueryiv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetQueryObjectuiv(id: number, pname: number, params: interop.PointerConvertible): void;

declare function glUnmapBuffer(target: number): number;

declare function glGetBufferPointerv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glDrawBuffers(n: number, bufs: interop.PointerConvertible): void;

declare function glUniformMatrix2x3fv(location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glUniformMatrix3x2fv(location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glUniformMatrix2x4fv(location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glUniformMatrix4x2fv(location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glUniformMatrix3x4fv(location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glUniformMatrix4x3fv(location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glBlitFramebuffer(srcX0: number, srcY0: number, srcX1: number, srcY1: number, dstX0: number, dstY0: number, dstX1: number, dstY1: number, mask: number, filter: number): void;

declare function glRenderbufferStorageMultisample(target: number, samples: number, internalformat: number, width: number, height: number): void;

declare function glFramebufferTextureLayer(target: number, attachment: number, texture: number, level: number, layer: number): void;

declare function glMapBufferRange(target: number, offset: number, length: number, access: number): interop.Pointer;

declare function glFlushMappedBufferRange(target: number, offset: number, length: number): void;

declare function glBindVertexArray(array: number): void;

declare function glDeleteVertexArrays(n: number, arrays: interop.PointerConvertible): void;

declare function glGenVertexArrays(n: number, arrays: interop.PointerConvertible): void;

declare function glIsVertexArray(array: number): number;

declare function glGetIntegeri_v(target: number, index: number, data: interop.PointerConvertible): void;

declare function glBeginTransformFeedback(primitiveMode: number): void;

declare function glEndTransformFeedback(): void;

declare function glBindBufferRange(target: number, index: number, buffer: number, offset: number, size: number): void;

declare function glBindBufferBase(target: number, index: number, buffer: number): void;

declare function glTransformFeedbackVaryings(program: number, count: number, varyings: interop.PointerConvertible, bufferMode: number): void;

declare function glGetTransformFeedbackVarying(program: number, index: number, bufSize: number, length: interop.PointerConvertible, size: interop.PointerConvertible, type: interop.PointerConvertible, name: string): void;

declare function glVertexAttribIPointer(index: number, size: number, type: number, stride: number, pointer: interop.PointerConvertible): void;

declare function glGetVertexAttribIiv(index: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetVertexAttribIuiv(index: number, pname: number, params: interop.PointerConvertible): void;

declare function glVertexAttribI4i(index: number, x: number, y: number, z: number, w: number): void;

declare function glVertexAttribI4ui(index: number, x: number, y: number, z: number, w: number): void;

declare function glVertexAttribI4iv(index: number, v: interop.PointerConvertible): void;

declare function glVertexAttribI4uiv(index: number, v: interop.PointerConvertible): void;

declare function glGetUniformuiv(program: number, location: number, params: interop.PointerConvertible): void;

declare function glGetFragDataLocation(program: number, name: string): number;

declare function glUniform1ui(location: number, v0: number): void;

declare function glUniform2ui(location: number, v0: number, v1: number): void;

declare function glUniform3ui(location: number, v0: number, v1: number, v2: number): void;

declare function glUniform4ui(location: number, v0: number, v1: number, v2: number, v3: number): void;

declare function glUniform1uiv(location: number, count: number, value: interop.PointerConvertible): void;

declare function glUniform2uiv(location: number, count: number, value: interop.PointerConvertible): void;

declare function glUniform3uiv(location: number, count: number, value: interop.PointerConvertible): void;

declare function glUniform4uiv(location: number, count: number, value: interop.PointerConvertible): void;

declare function glClearBufferiv(buffer: number, drawbuffer: number, value: interop.PointerConvertible): void;

declare function glClearBufferuiv(buffer: number, drawbuffer: number, value: interop.PointerConvertible): void;

declare function glClearBufferfv(buffer: number, drawbuffer: number, value: interop.PointerConvertible): void;

declare function glClearBufferfi(buffer: number, drawbuffer: number, depth: number, stencil: number): void;

declare function glGetStringi(name: number, index: number): interop.Pointer;

declare function glCopyBufferSubData(readTarget: number, writeTarget: number, readOffset: number, writeOffset: number, size: number): void;

declare function glGetUniformIndices(program: number, uniformCount: number, uniformNames: interop.PointerConvertible, uniformIndices: interop.PointerConvertible): void;

declare function glGetActiveUniformsiv(program: number, uniformCount: number, uniformIndices: interop.PointerConvertible, pname: number, params: interop.PointerConvertible): void;

declare function glGetUniformBlockIndex(program: number, uniformBlockName: string): number;

declare function glGetActiveUniformBlockiv(program: number, uniformBlockIndex: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetActiveUniformBlockName(program: number, uniformBlockIndex: number, bufSize: number, length: interop.PointerConvertible, uniformBlockName: string): void;

declare function glUniformBlockBinding(program: number, uniformBlockIndex: number, uniformBlockBinding: number): void;

declare function glDrawArraysInstanced(mode: number, first: number, count: number, instancecount: number): void;

declare function glDrawElementsInstanced(mode: number, count: number, type: number, indices: interop.PointerConvertible, instancecount: number): void;

declare function glFenceSync(condition: number, flags: number): interop.Pointer;

declare function glIsSync(sync: interop.PointerConvertible): number;

declare function glDeleteSync(sync: interop.PointerConvertible): void;

declare function glClientWaitSync(sync: interop.PointerConvertible, flags: number, timeout: number): number;

declare function glWaitSync(sync: interop.PointerConvertible, flags: number, timeout: number): void;

declare function glGetInteger64v(pname: number, params: interop.PointerConvertible): void;

declare function glGetSynciv(sync: interop.PointerConvertible, pname: number, bufSize: number, length: interop.PointerConvertible, values: interop.PointerConvertible): void;

declare function glGetInteger64i_v(target: number, index: number, data: interop.PointerConvertible): void;

declare function glGetBufferParameteri64v(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glGenSamplers(count: number, samplers: interop.PointerConvertible): void;

declare function glDeleteSamplers(count: number, samplers: interop.PointerConvertible): void;

declare function glIsSampler(sampler: number): number;

declare function glBindSampler(unit: number, sampler: number): void;

declare function glSamplerParameteri(sampler: number, pname: number, param: number): void;

declare function glSamplerParameteriv(sampler: number, pname: number, param: interop.PointerConvertible): void;

declare function glSamplerParameterf(sampler: number, pname: number, param: number): void;

declare function glSamplerParameterfv(sampler: number, pname: number, param: interop.PointerConvertible): void;

declare function glGetSamplerParameteriv(sampler: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetSamplerParameterfv(sampler: number, pname: number, params: interop.PointerConvertible): void;

declare function glVertexAttribDivisor(index: number, divisor: number): void;

declare function glBindTransformFeedback(target: number, id: number): void;

declare function glDeleteTransformFeedbacks(n: number, ids: interop.PointerConvertible): void;

declare function glGenTransformFeedbacks(n: number, ids: interop.PointerConvertible): void;

declare function glIsTransformFeedback(id: number): number;

declare function glPauseTransformFeedback(): void;

declare function glResumeTransformFeedback(): void;

declare function glGetProgramBinary(program: number, bufSize: number, length: interop.PointerConvertible, binaryFormat: interop.PointerConvertible, binary: interop.PointerConvertible): void;

declare function glProgramBinary(program: number, binaryFormat: number, binary: interop.PointerConvertible, length: number): void;

declare function glProgramParameteri(program: number, pname: number, value: number): void;

declare function glInvalidateFramebuffer(target: number, numAttachments: number, attachments: interop.PointerConvertible): void;

declare function glInvalidateSubFramebuffer(target: number, numAttachments: number, attachments: interop.PointerConvertible, x: number, y: number, width: number, height: number): void;

declare function glTexStorage2D(target: number, levels: number, internalformat: number, width: number, height: number): void;

declare function glTexStorage3D(target: number, levels: number, internalformat: number, width: number, height: number, depth: number): void;

declare function glGetInternalformativ(target: number, internalformat: number, pname: number, bufSize: number, params: interop.PointerConvertible): void;

declare function glCopyTextureLevelsAPPLE(destinationTexture: number, sourceTexture: number, sourceBaseLevel: number, sourceLevelCount: number): void;

declare function glLabelObjectEXT(type: number, object: number, length: number, label: string): void;

declare function glGetObjectLabelEXT(type: number, object: number, bufSize: number, length: interop.PointerConvertible, label: string): void;

declare function glInsertEventMarkerEXT(length: number, marker: string): void;

declare function glPushGroupMarkerEXT(length: number, marker: string): void;

declare function glPopGroupMarkerEXT(): void;

declare function glUseProgramStagesEXT(pipeline: number, stages: number, program: number): void;

declare function glActiveShaderProgramEXT(pipeline: number, program: number): void;

declare function glCreateShaderProgramvEXT(type: number, count: number, strings: interop.PointerConvertible): number;

declare function glBindProgramPipelineEXT(pipeline: number): void;

declare function glDeleteProgramPipelinesEXT(n: number, pipelines: interop.PointerConvertible): void;

declare function glGenProgramPipelinesEXT(n: number, pipelines: interop.PointerConvertible): void;

declare function glIsProgramPipelineEXT(pipeline: number): number;

declare function glProgramParameteriEXT(program: number, pname: number, value: number): void;

declare function glGetProgramPipelineivEXT(pipeline: number, pname: number, params: interop.PointerConvertible): void;

declare function glValidateProgramPipelineEXT(pipeline: number): void;

declare function glGetProgramPipelineInfoLogEXT(pipeline: number, bufSize: number, length: interop.PointerConvertible, infoLog: string): void;

declare function glProgramUniform1iEXT(program: number, location: number, x: number): void;

declare function glProgramUniform2iEXT(program: number, location: number, x: number, y: number): void;

declare function glProgramUniform3iEXT(program: number, location: number, x: number, y: number, z: number): void;

declare function glProgramUniform4iEXT(program: number, location: number, x: number, y: number, z: number, w: number): void;

declare function glProgramUniform1fEXT(program: number, location: number, x: number): void;

declare function glProgramUniform2fEXT(program: number, location: number, x: number, y: number): void;

declare function glProgramUniform3fEXT(program: number, location: number, x: number, y: number, z: number): void;

declare function glProgramUniform4fEXT(program: number, location: number, x: number, y: number, z: number, w: number): void;

declare function glProgramUniform1uiEXT(program: number, location: number, x: number): void;

declare function glProgramUniform2uiEXT(program: number, location: number, x: number, y: number): void;

declare function glProgramUniform3uiEXT(program: number, location: number, x: number, y: number, z: number): void;

declare function glProgramUniform4uiEXT(program: number, location: number, x: number, y: number, z: number, w: number): void;

declare function glProgramUniform1ivEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform2ivEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform3ivEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform4ivEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform1fvEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform2fvEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform3fvEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform4fvEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform1uivEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform2uivEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform3uivEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniform4uivEXT(program: number, location: number, count: number, value: interop.PointerConvertible): void;

declare function glProgramUniformMatrix2fvEXT(program: number, location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glProgramUniformMatrix3fvEXT(program: number, location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glProgramUniformMatrix4fvEXT(program: number, location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glProgramUniformMatrix2x3fvEXT(program: number, location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glProgramUniformMatrix3x2fvEXT(program: number, location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glProgramUniformMatrix2x4fvEXT(program: number, location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glProgramUniformMatrix4x2fvEXT(program: number, location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glProgramUniformMatrix3x4fvEXT(program: number, location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glProgramUniformMatrix4x3fvEXT(program: number, location: number, count: number, transpose: number, value: interop.PointerConvertible): void;

declare function glAlphaFunc(func: number, ref: number): void;

declare function glClearColor(red: number, green: number, blue: number, alpha: number): void;

declare function glClearDepthf(depth: number): void;

declare function glClipPlanef(plane: number, equation: interop.PointerConvertible): void;

declare function glColor4f(red: number, green: number, blue: number, alpha: number): void;

declare function glDepthRangef(zNear: number, zFar: number): void;

declare function glFogf(pname: number, param: number): void;

declare function glFogfv(pname: number, params: interop.PointerConvertible): void;

declare function glFrustumf(left: number, right: number, bottom: number, top: number, zNear: number, zFar: number): void;

declare function glGetClipPlanef(pname: number, equation: interop.PointerConvertible): void;

declare function glGetFloatv(pname: number, params: interop.PointerConvertible): void;

declare function glGetLightfv(light: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetMaterialfv(face: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetTexEnvfv(env: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetTexParameterfv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glLightModelf(pname: number, param: number): void;

declare function glLightModelfv(pname: number, params: interop.PointerConvertible): void;

declare function glLightf(light: number, pname: number, param: number): void;

declare function glLightfv(light: number, pname: number, params: interop.PointerConvertible): void;

declare function glLineWidth(width: number): void;

declare function glLoadMatrixf(m: interop.PointerConvertible): void;

declare function glMaterialf(face: number, pname: number, param: number): void;

declare function glMaterialfv(face: number, pname: number, params: interop.PointerConvertible): void;

declare function glMultMatrixf(m: interop.PointerConvertible): void;

declare function glMultiTexCoord4f(target: number, s: number, t: number, r: number, q: number): void;

declare function glNormal3f(nx: number, ny: number, nz: number): void;

declare function glOrthof(left: number, right: number, bottom: number, top: number, zNear: number, zFar: number): void;

declare function glPointParameterf(pname: number, param: number): void;

declare function glPointParameterfv(pname: number, params: interop.PointerConvertible): void;

declare function glPointSize(size: number): void;

declare function glPolygonOffset(factor: number, units: number): void;

declare function glRotatef(angle: number, x: number, y: number, z: number): void;

declare function glSampleCoverage(value: number, invert: number): void;

declare function glScalef(x: number, y: number, z: number): void;

declare function glTexEnvf(target: number, pname: number, param: number): void;

declare function glTexEnvfv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glTexParameterf(target: number, pname: number, param: number): void;

declare function glTexParameterfv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glTranslatef(x: number, y: number, z: number): void;

declare function glActiveTexture(texture: number): void;

declare function glAlphaFuncx(func: number, ref: number): void;

declare function glBindBuffer(target: number, buffer: number): void;

declare function glBindTexture(target: number, texture: number): void;

declare function glBlendFunc(sfactor: number, dfactor: number): void;

declare function glBufferData(target: number, size: number, data: interop.PointerConvertible, usage: number): void;

declare function glBufferSubData(target: number, offset: number, size: number, data: interop.PointerConvertible): void;

declare function glClear(mask: number): void;

declare function glClearColorx(red: number, green: number, blue: number, alpha: number): void;

declare function glClearDepthx(depth: number): void;

declare function glClearStencil(s: number): void;

declare function glClientActiveTexture(texture: number): void;

declare function glClipPlanex(plane: number, equation: interop.PointerConvertible): void;

declare function glColor4ub(red: number, green: number, blue: number, alpha: number): void;

declare function glColor4x(red: number, green: number, blue: number, alpha: number): void;

declare function glColorMask(red: number, green: number, blue: number, alpha: number): void;

declare function glColorPointer(size: number, type: number, stride: number, pointer: interop.PointerConvertible): void;

declare function glCompressedTexImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, imageSize: number, data: interop.PointerConvertible): void;

declare function glCompressedTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, imageSize: number, data: interop.PointerConvertible): void;

declare function glCopyTexImage2D(target: number, level: number, internalformat: number, x: number, y: number, width: number, height: number, border: number): void;

declare function glCopyTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, x: number, y: number, width: number, height: number): void;

declare function glCullFace(mode: number): void;

declare function glDeleteBuffers(n: number, buffers: interop.PointerConvertible): void;

declare function glDeleteTextures(n: number, textures: interop.PointerConvertible): void;

declare function glDepthFunc(func: number): void;

declare function glDepthMask(flag: number): void;

declare function glDepthRangex(zNear: number, zFar: number): void;

declare function glDisable(cap: number): void;

declare function glDisableClientState(array: number): void;

declare function glDrawArrays(mode: number, first: number, count: number): void;

declare function glDrawElements(mode: number, count: number, type: number, indices: interop.PointerConvertible): void;

declare function glEnable(cap: number): void;

declare function glEnableClientState(array: number): void;

declare function glFinish(): void;

declare function glFlush(): void;

declare function glFogx(pname: number, param: number): void;

declare function glFogxv(pname: number, params: interop.PointerConvertible): void;

declare function glFrontFace(mode: number): void;

declare function glFrustumx(left: number, right: number, bottom: number, top: number, zNear: number, zFar: number): void;

declare function glGenBuffers(n: number, buffers: interop.PointerConvertible): void;

declare function glGenTextures(n: number, textures: interop.PointerConvertible): void;

declare function glGetBooleanv(pname: number, params: interop.PointerConvertible): void;

declare function glGetBufferParameteriv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetClipPlanex(pname: number, eqn: unknown /* const array */): void;

declare function glGetError(): number;

declare function glGetFixedv(pname: number, params: interop.PointerConvertible): void;

declare function glGetIntegerv(pname: number, params: interop.PointerConvertible): void;

declare function glGetLightxv(light: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetMaterialxv(face: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetPointerv(pname: number, params: interop.PointerConvertible): void;

declare function glGetString(name: number): interop.Pointer;

declare function glGetTexEnviv(env: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetTexEnvxv(env: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetTexParameteriv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glGetTexParameterxv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glHint(target: number, mode: number): void;

declare function glIsBuffer(buffer: number): number;

declare function glIsEnabled(cap: number): number;

declare function glIsTexture(texture: number): number;

declare function glLightModelx(pname: number, param: number): void;

declare function glLightModelxv(pname: number, params: interop.PointerConvertible): void;

declare function glLightx(light: number, pname: number, param: number): void;

declare function glLightxv(light: number, pname: number, params: interop.PointerConvertible): void;

declare function glLineWidthx(width: number): void;

declare function glLoadIdentity(): void;

declare function glLoadMatrixx(m: interop.PointerConvertible): void;

declare function glLogicOp(opcode: number): void;

declare function glMaterialx(face: number, pname: number, param: number): void;

declare function glMaterialxv(face: number, pname: number, params: interop.PointerConvertible): void;

declare function glMatrixMode(mode: number): void;

declare function glMultMatrixx(m: interop.PointerConvertible): void;

declare function glMultiTexCoord4x(target: number, s: number, t: number, r: number, q: number): void;

declare function glNormal3x(nx: number, ny: number, nz: number): void;

declare function glNormalPointer(type: number, stride: number, pointer: interop.PointerConvertible): void;

declare function glOrthox(left: number, right: number, bottom: number, top: number, zNear: number, zFar: number): void;

declare function glPixelStorei(pname: number, param: number): void;

declare function glPointParameterx(pname: number, param: number): void;

declare function glPointParameterxv(pname: number, params: interop.PointerConvertible): void;

declare function glPointSizex(size: number): void;

declare function glPolygonOffsetx(factor: number, units: number): void;

declare function glPopMatrix(): void;

declare function glPushMatrix(): void;

declare function glReadPixels(x: number, y: number, width: number, height: number, format: number, type: number, pixels: interop.PointerConvertible): void;

declare function glRotatex(angle: number, x: number, y: number, z: number): void;

declare function glSampleCoveragex(value: number, invert: number): void;

declare function glScalex(x: number, y: number, z: number): void;

declare function glScissor(x: number, y: number, width: number, height: number): void;

declare function glShadeModel(mode: number): void;

declare function glStencilFunc(func: number, ref: number, mask: number): void;

declare function glStencilMask(mask: number): void;

declare function glStencilOp(fail: number, zfail: number, zpass: number): void;

declare function glTexCoordPointer(size: number, type: number, stride: number, pointer: interop.PointerConvertible): void;

declare function glTexEnvi(target: number, pname: number, param: number): void;

declare function glTexEnvx(target: number, pname: number, param: number): void;

declare function glTexEnviv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glTexEnvxv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glTexImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, format: number, type: number, pixels: interop.PointerConvertible): void;

declare function glTexParameteri(target: number, pname: number, param: number): void;

declare function glTexParameterx(target: number, pname: number, param: number): void;

declare function glTexParameteriv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glTexParameterxv(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glTexSubImage2D(target: number, level: number, xoffset: number, yoffset: number, width: number, height: number, format: number, type: number, pixels: interop.PointerConvertible): void;

declare function glTranslatex(x: number, y: number, z: number): void;

declare function glVertexPointer(size: number, type: number, stride: number, pointer: interop.PointerConvertible): void;

declare function glViewport(x: number, y: number, width: number, height: number): void;

declare function glCurrentPaletteMatrixOES(matrixpaletteindex: number): void;

declare function glLoadPaletteFromModelViewMatrixOES(): void;

declare function glMatrixIndexPointerOES(size: number, type: number, stride: number, pointer: interop.PointerConvertible): void;

declare function glWeightPointerOES(size: number, type: number, stride: number, pointer: interop.PointerConvertible): void;

declare function glPointSizePointerOES(type: number, stride: number, pointer: interop.PointerConvertible): void;

declare function glDrawTexsOES(x: number, y: number, z: number, width: number, height: number): void;

declare function glDrawTexiOES(x: number, y: number, z: number, width: number, height: number): void;

declare function glDrawTexxOES(x: number, y: number, z: number, width: number, height: number): void;

declare function glDrawTexsvOES(coords: interop.PointerConvertible): void;

declare function glDrawTexivOES(coords: interop.PointerConvertible): void;

declare function glDrawTexxvOES(coords: interop.PointerConvertible): void;

declare function glDrawTexfOES(x: number, y: number, z: number, width: number, height: number): void;

declare function glDrawTexfvOES(coords: interop.PointerConvertible): void;

declare function glCopyTextureLevelsAPPLE(destinationTexture: number, sourceTexture: number, sourceBaseLevel: number, sourceLevelCount: number): void;

declare function glRenderbufferStorageMultisampleAPPLE(target: number, samples: number, internalformat: number, width: number, height: number): void;

declare function glResolveMultisampleFramebufferAPPLE(): void;

declare function glLabelObjectEXT(type: number, object: number, length: number, label: string): void;

declare function glGetObjectLabelEXT(type: number, object: number, bufSize: number, length: interop.PointerConvertible, label: string): void;

declare function glInsertEventMarkerEXT(length: number, marker: string): void;

declare function glPushGroupMarkerEXT(length: number, marker: string): void;

declare function glPopGroupMarkerEXT(): void;

declare function glDiscardFramebufferEXT(target: number, numAttachments: number, attachments: interop.PointerConvertible): void;

declare function glMapBufferRangeEXT(target: number, offset: number, length: number, access: number): interop.Pointer;

declare function glFlushMappedBufferRangeEXT(target: number, offset: number, length: number): void;

declare function glTexStorage2DEXT(target: number, levels: number, internalformat: number, width: number, height: number): void;

declare function glBlendEquationSeparateOES(modeRGB: number, modeAlpha: number): void;

declare function glBlendFuncSeparateOES(srcRGB: number, dstRGB: number, srcAlpha: number, dstAlpha: number): void;

declare function glBlendEquationOES(mode: number): void;

declare function glIsRenderbufferOES(renderbuffer: number): number;

declare function glBindRenderbufferOES(target: number, renderbuffer: number): void;

declare function glDeleteRenderbuffersOES(n: number, renderbuffers: interop.PointerConvertible): void;

declare function glGenRenderbuffersOES(n: number, renderbuffers: interop.PointerConvertible): void;

declare function glRenderbufferStorageOES(target: number, internalformat: number, width: number, height: number): void;

declare function glGetRenderbufferParameterivOES(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glIsFramebufferOES(framebuffer: number): number;

declare function glBindFramebufferOES(target: number, framebuffer: number): void;

declare function glDeleteFramebuffersOES(n: number, framebuffers: interop.PointerConvertible): void;

declare function glGenFramebuffersOES(n: number, framebuffers: interop.PointerConvertible): void;

declare function glCheckFramebufferStatusOES(target: number): number;

declare function glFramebufferRenderbufferOES(target: number, attachment: number, renderbuffertarget: number, renderbuffer: number): void;

declare function glFramebufferTexture2DOES(target: number, attachment: number, textarget: number, texture: number, level: number): void;

declare function glGetFramebufferAttachmentParameterivOES(target: number, attachment: number, pname: number, params: interop.PointerConvertible): void;

declare function glGenerateMipmapOES(target: number): void;

declare function glGetBufferPointervOES(target: number, pname: number, params: interop.PointerConvertible): void;

declare function glMapBufferOES(target: number, access: number): interop.Pointer;

declare function glUnmapBufferOES(target: number): number;

declare function glBindVertexArrayOES(array: number): void;

declare function glDeleteVertexArraysOES(n: number, arrays: interop.PointerConvertible): void;

declare function glGenVertexArraysOES(n: number, arrays: interop.PointerConvertible): void;

declare function glIsVertexArrayOES(array: number): number;

declare interface EAGLDrawable {
  get drawableProperties(): NSDictionary;
  set drawableProperties(value: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object>);

  setDrawableProperties(drawableProperties: NSDictionary<interop.Object, interop.Object> | Record<interop.Object, interop.Object> | null): void;
}

declare class EAGLDrawable extends NativeObject implements EAGLDrawable {
}

declare class EAGLSharegroup extends NSObject {
  debugLabel: string;

  setDebugLabel(debugLabel: string): void;
}

declare class EAGLContext extends NSObject {
  initWithAPI(api: interop.Enum<typeof EAGLRenderingAPI>): this;

  initWithAPISharegroup(api: interop.Enum<typeof EAGLRenderingAPI>, sharegroup: EAGLSharegroup): this;

  static setCurrentContext(context: EAGLContext | null): boolean;

  static currentContext(): EAGLContext;

  readonly API: interop.Enum<typeof EAGLRenderingAPI>;

  readonly sharegroup: EAGLSharegroup;

  debugLabel: string;

  multiThreaded: boolean;

  setDebugLabel(debugLabel: string): void;

  isMultiThreaded(): boolean;

  setMultiThreaded(multiThreaded: boolean): void;

  renderbufferStorageFromDrawable(target: number, drawable: EAGLDrawable | null): boolean;

  presentRenderbuffer(target: number): boolean;

  presentRenderbufferAtTime(target: number, presentationTime: number): boolean;

  presentRenderbufferAfterMinimumDuration(target: number, duration: number): boolean;

  texImageIOSurfaceTargetInternalFormatWidthHeightFormatTypePlane(ioSurface: interop.Object, target: number, internalFormat: number, width: number, height: number, format: number, type: number, plane: number): boolean;
}

