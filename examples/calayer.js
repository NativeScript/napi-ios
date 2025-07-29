// @ts-check

// import "@nativescript/macos-node-api";

/// <reference path="../packages/macos/types/index.d.ts" />

class ApplicationDelegate extends NSObject {
  static ObjCProtocols = [NSApplicationDelegate, NSWindowDelegate];

  static {
    NativeClass(this);
  }

  /**
   * @param {NSNotification} _notification
   */
  applicationDidFinishLaunching(_notification) {
    const menu = NSMenu.new();
    NSApp.mainMenu = menu;

    const appMenuItem = NSMenuItem.new();
    menu.addItem(appMenuItem);

    const appMenu = NSMenu.new();
    appMenuItem.submenu = appMenu;

    appMenu.addItemWithTitleActionKeyEquivalent("Quit", "terminate:", "q");

    const controller = ViewController.new();
    const window = NSWindow.windowWithContentViewController(controller);

    window.title = "NativeScript for macOS";
    window.delegate = this;
    window.styleMask = NSWindowStyleMask.Titled |
      NSWindowStyleMask.Closable |
      NSWindowStyleMask.Miniaturizable |
      NSWindowStyleMask.Resizable |
      NSWindowStyleMask.FullSizeContentView;

    window.titlebarAppearsTransparent = true;
    window.titleVisibility = NSWindowTitleVisibility.Hidden;

    window.backgroundColor = NSColor.colorWithSRGBRedGreenBlueAlpha(
      118 / 255,
      171 / 255,
      235 / 255,
      1,
    );

    window.makeKeyAndOrderFront(this);

    NSApp.activateIgnoringOtherApps(false);
  }

  /**
   * @param {NSNotification} _notification
   */
  windowWillClose(_notification) {
    NSApp.terminate(this);
  }
}

class ViewController extends NSViewController {
  static ObjCExposedMethods = {
    buttonClicked: {
      params: [NSView],
      returns: interop.types.void,
    },
  };

  static {
    NativeClass(this);
  }

  i = 0;
  /**
   * @type {NSButton | null}
   */
  button = null;

  /**
   * @override
   */
  loadView() {
    this.view = NSView.new();
    // Make the view layer-backed so we can use CALayer features
    this.view.wantsLayer = true;
  }

  /**
   * @override
   */
  viewDidLoad() {
    super.viewDidLoad();

    this.view.frame = {
      origin: { x: 0, y: 0 },
      size: { width: 500, height: 500 },
    };

    // Create a beautiful gradient background using CALayer
    const gradientLayer = CAGradientLayer.layer();
    gradientLayer.frame = this.view.bounds;

    // Create a vibrant gradient from blue to purple
    gradientLayer.colors = [
      NSColor.colorWithSRGBRedGreenBlueAlpha(74 / 255, 144 / 255, 226 / 255, 1)
        .CGColor,
      NSColor.colorWithSRGBRedGreenBlueAlpha(142 / 255, 68 / 255, 173 / 255, 1)
        .CGColor,
      NSColor.colorWithSRGBRedGreenBlueAlpha(41 / 255, 128 / 255, 185 / 255, 1)
        .CGColor,
    ];

    // Set gradient direction (top to bottom)
    gradientLayer.startPoint = { x: 0.5, y: 0 };
    gradientLayer.endPoint = { x: 0.5, y: 1 };

    const nsArray = NSMutableArray.arrayWithCapacity(3);
    nsArray[0] = "hello world";
    console.log(nsArray);

    // Add some nice gradient locations for smoother transitions
    gradientLayer.locations = [0, 0.5, 1];

    // Apply the gradient layer to the view's layer
    this.view.layer.insertSublayerAtIndex(gradientLayer, 0);

    const label = NSTextField.alloc().initWithFrame({
      origin: { x: 0, y: 0 },
      size: { width: 390, height: 100 },
    });

    label.stringValue = "Hello, macOS";

    label.bezeled = false;
    label.drawsBackground = false;
    label.editable = false;
    label.selectable = false;
    label.alignment = NSTextAlignment.Center;
    label.translatesAutoresizingMaskIntoConstraints = false;
    label.textColor = NSColor.colorWithSRGBRedGreenBlueAlpha(1, 1, 1, 1);
    label.font = NSFontManager.sharedFontManager.convertFontToHaveTrait(
      NSFont.fontWithNameSize(label.font.fontName, 45),
      NSFontTraitMask.Bold,
    );

    label.sizeToFit();

    const vstack = NSStackView.alloc().initWithFrame({
      origin: { x: 0, y: 0 },
      size: { width: 500, height: 500 },
    });

    vstack.orientation = NSUserInterfaceLayoutOrientation.Vertical;
    vstack.alignment = NSLayoutAttribute.CenterX;
    vstack.distribution = NSStackViewDistribution.Fill;
    vstack.spacing = 40;
    vstack.translatesAutoresizingMaskIntoConstraints = false;

    const button = NSButton.buttonWithTitleTargetAction(
      "Try me!",
      this,
      "buttonClicked",
    );
    button.controlSize = NSControlSize.Large;
    button.bezelStyle = NSBezelStyle.Rounded;
    button.setButtonType(NSButtonType.MomentaryLight);
    button.translatesAutoresizingMaskIntoConstraints = false;

    this.button = button;

    vstack.addViewInGravity(label, NSStackViewGravity.Center);
    vstack.addViewInGravity(button, NSStackViewGravity.Center);

    this.view.addSubview(vstack);

    vstack.centerXAnchor.constraintEqualToAnchor(
      this.view.centerXAnchor,
    ).active = true;
    vstack.centerYAnchor.constraintEqualToAnchor(
      this.view.centerYAnchor,
    ).active = true;
  }

  /**
   * @param {NSNotification} _sender
   */
  buttonClicked(_sender) {
    if (this.i == 0) {
      const alert = NSAlert.new();
      alert.icon = NSImage.imageWithSystemSymbolNameAccessibilityDescription(
        "cursorarrow.click",
        null,
      );
      alert.messageText = "Clicked for the first time!";
      alert.runModal();
    }

    if (this.button) this.button.title = `Clicked ${++this.i} times`;
  }
}

const NSApp = NSApplication.sharedApplication;

NSApp.delegate = ApplicationDelegate.new();

NSApp.setActivationPolicy(NSApplicationActivationPolicy.Regular);

console.log("NSApp", NSApp);

NSApplicationMain(0, null);

console.log("NSApp.delegate", NSApp.delegate);
