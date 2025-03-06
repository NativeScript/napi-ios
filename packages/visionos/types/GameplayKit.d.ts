/// <reference types="@nativescript/objc-node-api" />

declare const GKGameModelMinScore: number;

declare const GKGameModelMaxScore: number;

declare const GKRTreeSplitStrategy: {
  Halve: 0,
  Linear: 1,
  Quadratic: 2,
  ReduceOverlap: 3,
};

declare const GKMeshGraphTriangulationMode: {
  Vertices: 1,
  Centers: 2,
  EdgeMidpoints: 4,
};

declare class GKTriangle {
  constructor(init?: GKTriangle);
  points: unknown /* const array */;
}

declare class GKBox {
  constructor(init?: GKBox);
  boxMin: unknown /* ext vector */;
  boxMax: unknown /* ext vector */;
}

declare class GKQuad {
  constructor(init?: GKQuad);
  quadMin: unknown /* ext vector */;
  quadMax: unknown /* ext vector */;
}

declare interface GKStrategist extends NSObject {
  gameModel: GKGameModel;

  randomSource: GKRandom;

  bestMoveForActivePlayer(): GKGameModelUpdate;
}

declare class GKStrategist extends NativeObject implements GKStrategist {
}

declare interface GKGameModelPlayer extends NSObject {
  readonly playerId: number;
}

declare class GKGameModelPlayer extends NativeObject implements GKGameModelPlayer {
}

declare interface GKGameModel extends NSObject, NSCopying {
  readonly players: NSArray;

  readonly activePlayer: GKGameModelPlayer;

  setGameModel(gameModel: GKGameModel): void;

  gameModelUpdatesForPlayer(player: GKGameModelPlayer): NSArray;

  applyGameModelUpdate(gameModelUpdate: GKGameModelUpdate): void;

  scoreForPlayer?(player: GKGameModelPlayer): number;

  isWinForPlayer?(player: GKGameModelPlayer): boolean;

  isLossForPlayer?(player: GKGameModelPlayer): boolean;

  unapplyGameModelUpdate?(gameModelUpdate: GKGameModelUpdate): void;
}

declare class GKGameModel extends NativeObject implements GKGameModel {
}

declare interface GKGameModelUpdate extends NSObject {
  value: number;
}

declare class GKGameModelUpdate extends NativeObject implements GKGameModelUpdate {
}

declare interface GKRandom {
  nextInt(): number;

  nextIntWithUpperBound(upperBound: number): number;

  nextUniform(): number;

  nextBool(): boolean;
}

declare class GKRandom extends NativeObject implements GKRandom {
}

declare interface GKSceneRootNodeType extends NSObject {
}

declare class GKSceneRootNodeType extends NativeObject implements GKSceneRootNodeType {
}

declare interface GKAgentDelegate extends NSObject {
  agentWillUpdate?(agent: interop.Object): void;

  agentDidUpdate?(agent: interop.Object): void;
}

declare class GKAgentDelegate extends NativeObject implements GKAgentDelegate {
}

declare class GKCompositeBehavior extends GKBehavior {
  readonly behaviorCount: number;

  static behaviorWithBehaviors<This extends abstract new (...args: any) => any>(this: This, behaviors: NSArray<interop.Object> | Array<interop.Object>): InstanceType<This>;

  static behaviorWithBehaviorsAndWeights<This extends abstract new (...args: any) => any>(this: This, behaviors: NSArray<interop.Object> | Array<interop.Object>, weights: NSArray<interop.Object> | Array<interop.Object>): InstanceType<This>;

  setWeightForBehavior(weight: number, behavior: interop.Object): void;

  weightForBehavior(behavior: interop.Object): number;

  removeBehavior(behavior: interop.Object): void;

  removeAllBehaviors(): void;

  objectAtIndexedSubscript(idx: number): interop.Object;

  setObjectForKeyedSubscript(weight: NSNumber, behavior: interop.Object): void;

  objectForKeyedSubscript(behavior: interop.Object): NSNumber;
}

