"use strict";

const { runAsyncMemoryTest } = require("./_harness");

function makeFrame(x, y, width, height) {
  return {
    origin: { x, y },
    size: { width, height },
  };
}

runAsyncMemoryTest("appkit-navigation-extreme", async (t) => {
  const visualMode = false;
  const cycles = 180;
  const maxDepth = 12;
  const subviewsPerScreen = 24;

  const nativeWeakControllers = NSHashTable.weakObjectsHashTable();
  const nativeWeakViews = NSHashTable.weakObjectsHashTable();
  const jsWeakControllers = [];
  const jsWeakViews = [];

  let createdControllers = 0;
  let createdViews = 0;
  let pushes = 0;
  let pops = 0;
  let routeId = 0;

  function countAlive(weakRefs) {
    let alive = 0;
    for (const ref of weakRefs) {
      if (ref.deref()) {
        alive += 1;
      }
    }
    return alive;
  }

  function liveNativeCount(table) {
    const objects = table.allObjects;
    return objects ? objects.count : table.count;
  }

  function createRouteController(depth, cycle) {
    const controller = NSViewController.new();
    const root = NSView.alloc().initWithFrame(makeFrame(0, 0, 960, 640));
    root.wantsLayer = true;
    root.layer.backgroundColor = NSColor.colorWithSRGBRedGreenBlueAlpha(
      (routeId % 2) === 0 ? 0.08 : 0.9,
      (depth % 2) === 0 ? 0.2 : 0.82,
      (cycle % 2) === 0 ? 0.15 : 0.78,
      1,
    ).CGColor;

    const header = NSTextField.alloc().initWithFrame(makeFrame(60, 540, 840, 72));
    header.stringValue = `EXTREME route ${routeId} depth ${depth} cycle ${cycle}`;
    header.bezeled = false;
    header.drawsBackground = false;
    header.editable = false;
    header.selectable = false;
    header.alignment = NSTextAlignment.Center;
    header.font = NSFont.boldSystemFontOfSize(34);
    header.textColor = NSColor.whiteColor;
    root.addSubview(header);

    for (let i = 0; i < subviewsPerScreen; i++) {
      const container = NSView.alloc().initWithFrame(
        makeFrame(8 + i * 7, 10 + i * 5, 260 + (i % 6) * 14, 34 + (i % 5) * 8),
      );
      container.wantsLayer = true;
      container.layer.backgroundColor = NSColor.colorWithSRGBRedGreenBlueAlpha(
        ((i % 17) + 1) / 18,
        ((depth + i) % 19) / 18,
        ((cycle + i) % 23) / 22,
        1,
      ).CGColor;

      const label = NSTextField.alloc().initWithFrame(makeFrame(2, 2, 220, 22));
      label.stringValue = `r:${routeId} d:${depth} i:${i}`;
      label.bezeled = false;
      label.drawsBackground = false;
      label.editable = false;
      label.selectable = false;
      container.addSubview(label);

      root.addSubview(container);

      nativeWeakViews.addObject(container);
      nativeWeakViews.addObject(label);
      jsWeakViews.push(new WeakRef(container));
      jsWeakViews.push(new WeakRef(label));
      createdViews += 2;
    }

    controller.view = root;
    controller.title = `extreme-${routeId++}`;

    nativeWeakControllers.addObject(controller);
    nativeWeakViews.addObject(root);
    jsWeakControllers.push(new WeakRef(controller));
    jsWeakViews.push(new WeakRef(root));
    createdControllers += 1;
    createdViews += 1;

    return controller;
  }

  let window = NSWindow.windowWithContentViewController(createRouteController(0, 0));
  window.setFrameDisplay(makeFrame(0, 0, 960, 640), false);
  window.center();
  window.makeKeyAndOrderFront(null);
  window.orderFrontRegardless();
  NSApplication.sharedApplication.activateIgnoringOtherApps(true);

  const navStack = [window.contentViewController];

  const pushController = (controller) => {
    navStack.push(controller);
    window.contentViewController = controller;
    pushes += 1;
  };

  const popController = () => {
    if (navStack.length <= 1) {
      return;
    }
    navStack.pop();
    window.contentViewController = navStack[navStack.length - 1];
    pops += 1;
  };

  for (let cycle = 0; cycle < cycles; cycle++) {
    if (visualMode) {
      window.title = `extreme cycle ${cycle + 1}/${cycles}`;
    }
    for (let depth = 1; depth <= maxDepth; depth++) {
      pushController(createRouteController(depth, cycle));
      if (visualMode) {
        await t.sleep(1);
      }
    }

    for (let depth = maxDepth; depth >= 1; depth--) {
      popController();
      if (visualMode) {
        await t.sleep(1);
      }
    }

    for (let i = 0; i < maxDepth * 2; i++) {
      pushController(createRouteController((i % maxDepth) + 1, cycle));
      if (visualMode) {
        await t.sleep(1);
      }
      popController();
      if (visualMode) {
        await t.sleep(1);
      }
    }

    if ((cycle + 1) % 8 === 0) {
      await t.forceGC(3, 36 * 1024 * 1024, 6);
    } else {
      await t.sleep(20);
    }

    if (visualMode && (cycle + 1) % 15 === 0) {
      console.log(`appkit-navigation-extreme progress ${cycle + 1}/${cycles}`);
      await t.sleep(30);
    }
  }

  while (navStack.length > 1) {
    popController();
  }

  const preCloseNativeControllers = liveNativeCount(nativeWeakControllers);
  const preCloseNativeViews = liveNativeCount(nativeWeakViews);

  navStack.length = 0;
  window.contentViewController = null;
  window.orderOut(null);
  window.close();
  window = null;

  let released = false;
  let postCloseNativeControllers = Number.MAX_SAFE_INTEGER;
  let postCloseNativeViews = Number.MAX_SAFE_INTEGER;
  let postCloseJsControllers = Number.MAX_SAFE_INTEGER;
  let postCloseJsViews = Number.MAX_SAFE_INTEGER;

  const releaseDeadline = t.now() + 25_000;
  while (t.now() < releaseDeadline) {
    await t.forceGC(1, 20 * 1024 * 1024, 5);
    await t.sleep(15);

    postCloseNativeControllers = liveNativeCount(nativeWeakControllers);
    postCloseNativeViews = liveNativeCount(nativeWeakViews);
    postCloseJsControllers = countAlive(jsWeakControllers);
    postCloseJsViews = countAlive(jsWeakViews);

    const controllerLiveRatio = createdControllers > 0
      ? postCloseNativeControllers / createdControllers
      : 0;
    const viewLiveRatio = createdViews > 0
      ? postCloseNativeViews / createdViews
      : 0;

    if (controllerLiveRatio <= 0.2 &&
        viewLiveRatio <= 0.2 &&
        postCloseNativeControllers <= preCloseNativeControllers + 12 &&
        postCloseNativeViews <= preCloseNativeViews + 120 &&
        postCloseJsControllers <= 12 &&
        postCloseJsViews <= 24) {
      released = true;
      break;
    }
  }

  t.assert(pushes === pops, `navigation imbalance pushes=${pushes} pops=${pops}`);
  t.assert(
    released,
    `cleanup incomplete createdControllers=${createdControllers} createdViews=${createdViews} preNativeControllers=${preCloseNativeControllers} preNativeViews=${preCloseNativeViews} postNativeControllers=${postCloseNativeControllers} postNativeViews=${postCloseNativeViews} postJsControllers=${postCloseJsControllers} postJsViews=${postCloseJsViews}`,
  );

  return {
    cycles,
    maxDepth,
    subviewsPerScreen,
    createdControllers,
    createdViews,
    pushes,
    pops,
    preCloseNativeControllers,
    preCloseNativeViews,
    postCloseNativeControllers,
    postCloseNativeViews,
    postCloseJsControllers,
    postCloseJsViews,
  };
}, {
  timeoutMs: 90_000,
  activationPolicy: NSApplicationActivationPolicy.Regular,
});
