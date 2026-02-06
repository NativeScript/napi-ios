/// <reference types="@nativescript/objc-node-api" />

declare const EAGLRenderingAPI: {
  S1: 1,
  S2: 2,
  S3: 3,
};

declare class __GLsync {
  constructor(init?: __GLsync);
}

declare function glBlendEquationOES(mode: number): void;

