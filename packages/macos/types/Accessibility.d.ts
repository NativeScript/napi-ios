/// <reference types="@nativescript/objc-node-api" />
/// <reference path="./Runtime.d.ts" />

declare const AXAnimatedImagesEnabledDidChangeNotification: string;

declare const AXTechnologyAutomation: string;

declare const AXTechnologyFullKeyboardAccess: string;

declare const AXTechnologyVoiceOver: string;

declare const AXTechnologySpeakScreen: string;

declare const AXPrefersNonBlinkingTextInsertionIndicatorDidChangeNotification: string;

declare const AXTechnologyZoom: string;

declare const AXTechnologyVoiceControl: string;

declare const AXTechnologyHoverText: string;

declare const AXPrefersHorizontalTextLayoutDidChangeNotification: string;

declare const AXTechnologySwitchControl: string;

declare const AXCustomContentImportance: {
  Default: 0,
  High: 1,
};

declare const AXNumericDataAxisDescriptorScale: {
  Linear: 0,
  Log10: 1,
  Ln: 2,
};

declare const AXSettingsFeature: {
  PersonalVoiceAllowAppsToRequestToUse: 1,
  AllowAppsToAddAudioToCalls: 2,
  AssistiveTouch: 3,
  AssistiveTouchDevices: 4,
  DwellControl: 5,
};

declare const AXChartDescriptorContentDirection: {
  LeftToRight: 0,
  RightToLeft: 1,
  TopToBottom: 2,
  BottomToTop: 3,
  RadialClockwise: 4,
  RadialCounterClockwise: 5,
};

declare function AXNameFromColor(color: interop.Object): string;

declare function AXPrefersHorizontalTextLayout(): boolean;

declare function AXAnimatedImagesEnabled(): boolean;

declare function AXAssistiveAccessEnabled(): boolean;

declare function AXPrefersNonBlinkingTextInsertionIndicator(): boolean;

declare function AXOpenSettingsFeature(feature: interop.Enum<typeof AXSettingsFeature>, completionHandler: (p1: NSError) => void): void;

declare interface AXMathExpressionProvider extends NSObjectProtocol {
  accessibilityMathExpression(): AXMathExpression;
}

declare class AXMathExpressionProvider extends NativeObject implements AXMathExpressionProvider {
}

declare interface AXChart extends NSObjectProtocol {
  accessibilityChartDescriptor: AXChartDescriptor;

  setAccessibilityChartDescriptor(accessibilityChartDescriptor: AXChartDescriptor | null): void;
}

declare class AXChart extends NativeObject implements AXChart {
}

declare interface AXCustomContentProvider extends NSObjectProtocol {
  get accessibilityCustomContent(): NSArray;
  set accessibilityCustomContent(value: NSArray<interop.Object> | Array<interop.Object>);

  accessibilityCustomContentBlock?: () => NSArray;

  setAccessibilityCustomContent(accessibilityCustomContent: NSArray<interop.Object> | Array<interop.Object> | null): void;

  setAccessibilityCustomContentBlock?(accessibilityCustomContentBlock: () => NSArray | null): void;
}

declare class AXCustomContentProvider extends NativeObject implements AXCustomContentProvider {
}

declare interface AXBrailleMapRenderer extends NSObjectProtocol {
  accessibilityBrailleMapRenderRegion?: CGRect;

  accessibilityBrailleMapRenderer?: (p1: AXBrailleMap) => void;

  setAccessibilityBrailleMapRenderRegion?(accessibilityBrailleMapRenderRegion: CGRect): void;

  setAccessibilityBrailleMapRenderer?(accessibilityBrailleMapRenderer: (p1: AXBrailleMap) => void): void;
}

declare class AXBrailleMapRenderer extends NativeObject implements AXBrailleMapRenderer {
}

declare interface AXDataAxisDescriptor extends NSCopying {
  title: string;

  attributedTitle: NSAttributedString;

  setTitle(title: string): void;

  setAttributedTitle(attributedTitle: NSAttributedString): void;
}

declare class AXDataAxisDescriptor extends NativeObject implements AXDataAxisDescriptor {
}

declare class AXBrailleTranslator extends NSObject {
  initWithBrailleTable(brailleTable: AXBrailleTable): this;

  translatePrintText(printText: string): AXBrailleTranslationResult;

  backTranslateBraille(braille: string): AXBrailleTranslationResult;
}

declare class AXBrailleTranslationResult extends NSObject implements NSCopying, NSCoding {
  readonly resultString: string;

  readonly locationMap: NSArray;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class AXBrailleTable extends NSObject implements NSCopying, NSCoding {
  readonly identifier: string;

  readonly localizedName: string;

  readonly providerIdentifier: string;

  readonly localizedProviderName: string;

  readonly language: string;

  readonly locales: NSSet;

  readonly isEightDot: boolean;

  static supportedLocales(): NSSet;

  static defaultTableForLocale(locale: NSLocale): AXBrailleTable;

  static tablesForLocale(locale: NSLocale): NSSet;

  static languageAgnosticTables(): NSSet;

  initWithIdentifier(identifier: string): this;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class AXMathExpressionRoot extends AXMathExpression {
  initWithRadicandExpressionsRootIndexExpression(radicandExpressions: NSArray<interop.Object> | Array<interop.Object>, rootIndexExpression: AXMathExpression): this;

  readonly radicandExpressions: NSArray;

  readonly rootIndexExpression: AXMathExpression;
}

declare class AXMathExpressionMultiscript extends AXMathExpression {
  initWithBaseExpressionPrescriptExpressionsPostscriptExpressions(baseExpression: AXMathExpression, prescriptExpressions: NSArray<interop.Object> | Array<interop.Object>, postscriptExpressions: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly baseExpression: AXMathExpression;

  readonly prescriptExpressions: NSArray;

  readonly postscriptExpressions: NSArray;
}

declare class AXMathExpressionFraction extends AXMathExpression {
  initWithNumeratorExpressionDenimonatorExpression(numeratorExpression: AXMathExpression, denimonatorExpression: AXMathExpression): this;

  readonly numeratorExpression: AXMathExpression;

  readonly denimonatorExpression: AXMathExpression;
}

declare class AXMathExpressionTableCell extends AXMathExpression {
  initWithExpressions(expressions: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly expressions: NSArray;
}

declare class AXMathExpressionTableRow extends AXMathExpression {
  initWithExpressions(expressions: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly expressions: NSArray;
}

declare class AXMathExpressionTable extends AXMathExpression {
  initWithExpressions(expressions: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly expressions: NSArray;
}

declare class AXMathExpressionText extends AXMathExpression {
  initWithContent(content: string): this;

  readonly content: string;
}

declare class AXMathExpressionIdentifier extends AXMathExpression {
  initWithContent(content: string): this;

  readonly content: string;
}

declare class AXBrailleMap extends NSObject implements NSCopying, NSSecureCoding {
  readonly dimensions: CGSize;

  setHeightAtPoint(status: number, point: CGPoint): void;

  heightAtPoint(point: CGPoint): number;

  presentImage(image: interop.Object): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class AXDataPointValue extends NSObject implements NSCopying {
  number: number;

  category: string;

  static valueWithNumber<This extends abstract new (...args: any) => any>(this: This, number: number): InstanceType<This>;

  static valueWithCategory<This extends abstract new (...args: any) => any>(this: This, category: string): InstanceType<This>;

  setNumber(number: number): void;

  setCategory(category: string): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class AXRequest extends NSObject implements NSCopying, NSSecureCoding {
  static readonly currentRequest: AXRequest;

  readonly technology: string;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class AXLiveAudioGraph extends NSObject {
  static start(): void;

  static updateValue(value: number): void;

  static stop(): void;
}

declare class AXMathExpressionOperator extends AXMathExpression {
  initWithContent(content: string): this;

  readonly content: string;
}

declare class AXCustomContent extends NSObject implements NSCopying, NSSecureCoding {
  static customContentWithLabelValue<This extends abstract new (...args: any) => any>(this: This, label: string, value: string): InstanceType<This>;

  static customContentWithAttributedLabelAttributedValue<This extends abstract new (...args: any) => any>(this: This, label: NSAttributedString, value: NSAttributedString): InstanceType<This>;

  readonly label: string;

  readonly attributedLabel: NSAttributedString;

  readonly value: string;

  readonly attributedValue: NSAttributedString;

  importance: interop.Enum<typeof AXCustomContentImportance>;

  setImportance(importance: interop.Enum<typeof AXCustomContentImportance>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;

  static readonly supportsSecureCoding: boolean;

  encodeWithCoder(coder: NSCoder): void;

  initWithCoder(coder: NSCoder): this;
}

declare class AXMathExpressionSubSuperscript extends AXMathExpression {
  initWithBaseExpressionSubscriptExpressionsSuperscriptExpressions(baseExpression: NSArray<interop.Object> | Array<interop.Object>, subscriptExpressions: NSArray<interop.Object> | Array<interop.Object>, superscriptExpressions: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly baseExpression: AXMathExpression;

  readonly subscriptExpressions: NSArray;

  readonly superscriptExpressions: NSArray;
}

declare class AXNumericDataAxisDescriptor extends NSObject implements AXDataAxisDescriptor {
  scaleType: interop.Enum<typeof AXNumericDataAxisDescriptorScale>;

  lowerBound: number;

  upperBound: number;

  valueDescriptionProvider: (p1: number) => string;

  get gridlinePositions(): NSArray;
  set gridlinePositions(value: NSArray<interop.Object> | Array<interop.Object>);

  initWithTitleLowerBoundUpperBoundGridlinePositionsValueDescriptionProvider(title: string, lowerbound: number, upperBound: number, gridlinePositions: NSArray<interop.Object> | Array<interop.Object> | null, valueDescriptionProvider: (p1: number) => string): this;

  initWithAttributedTitleLowerBoundUpperBoundGridlinePositionsValueDescriptionProvider(attributedTitle: NSAttributedString, lowerbound: number, upperBound: number, gridlinePositions: NSArray<interop.Object> | Array<interop.Object> | null, valueDescriptionProvider: (p1: number) => string): this;

  setScaleType(scaleType: interop.Enum<typeof AXNumericDataAxisDescriptorScale>): void;

  setLowerBound(lowerBound: number): void;

  setUpperBound(upperBound: number): void;

  setValueDescriptionProvider(valueDescriptionProvider: (p1: number) => string): void;

  setGridlinePositions(gridlinePositions: NSArray<interop.Object> | Array<interop.Object>): void;

  title: string;

  attributedTitle: NSAttributedString;

  setTitle(title: string): void;

  setAttributedTitle(attributedTitle: NSAttributedString): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class AXMathExpressionRow extends AXMathExpression {
  initWithExpressions(expressions: NSArray<interop.Object> | Array<interop.Object>): this;

  readonly expressions: NSArray;
}

declare class AXMathExpressionUnderOver extends AXMathExpression {
  initWithBaseExpressionUnderExpressionOverExpression(baseExpression: AXMathExpression, underExpression: AXMathExpression, overExpression: AXMathExpression): this;

  readonly baseExpression: AXMathExpression;

  readonly underExpression: AXMathExpression;

  readonly overExpression: AXMathExpression;
}

declare class AXMathExpressionFenced extends AXMathExpression {
  initWithExpressionsOpenStringCloseString(expressions: NSArray<interop.Object> | Array<interop.Object>, openString: string, closeString: string): this;

  readonly expressions: NSArray;

  readonly openString: string;

  readonly closeString: string;
}

declare class AXDataSeriesDescriptor extends NSObject implements NSCopying {
  name: string;

  attributedName: NSAttributedString;

  isContinuous: boolean;

  get dataPoints(): NSArray;
  set dataPoints(value: NSArray<interop.Object> | Array<interop.Object>);

  initWithNameIsContinuousDataPoints(name: string, isContinuous: boolean, dataPoints: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithAttributedNameIsContinuousDataPoints(attributedName: NSAttributedString, isContinuous: boolean, dataPoints: NSArray<interop.Object> | Array<interop.Object>): this;

  setName(name: string | null): void;

  setAttributedName(attributedName: NSAttributedString): void;

  setIsContinuous(isContinuous: boolean): void;

  setDataPoints(dataPoints: NSArray<interop.Object> | Array<interop.Object>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class AXDataPoint extends NSObject implements NSCopying {
  xValue: AXDataPointValue;

  yValue: AXDataPointValue;

  get additionalValues(): NSArray;
  set additionalValues(value: NSArray<interop.Object> | Array<interop.Object>);

  label: string;

  attributedLabel: NSAttributedString;

  initWithXY(xValue: AXDataPointValue, yValue: AXDataPointValue | null): this;

  initWithXYAdditionalValues(xValue: AXDataPointValue, yValue: AXDataPointValue | null, additionalValues: NSArray<interop.Object> | Array<interop.Object> | null): this;

  initWithXYAdditionalValuesLabel(xValue: AXDataPointValue, yValue: AXDataPointValue | null, additionalValues: NSArray<interop.Object> | Array<interop.Object> | null, label: string | null): this;

  setXValue(xValue: AXDataPointValue): void;

  setYValue(yValue: AXDataPointValue | null): void;

  setAdditionalValues(additionalValues: NSArray<interop.Object> | Array<interop.Object>): void;

  setLabel(label: string | null): void;

  setAttributedLabel(attributedLabel: NSAttributedString | null): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class AXChartDescriptor extends NSObject implements NSCopying {
  title: string;

  attributedTitle: NSAttributedString;

  summary: string;

  contentDirection: interop.Enum<typeof AXChartDescriptorContentDirection>;

  contentFrame: CGRect;

  get series(): NSArray;
  set series(value: NSArray<interop.Object> | Array<interop.Object>);

  xAxis: AXDataAxisDescriptor;

  yAxis: AXNumericDataAxisDescriptor;

  get additionalAxes(): NSArray;
  set additionalAxes(value: NSArray<interop.Object> | Array<interop.Object>);

  initWithTitleSummaryXAxisDescriptorYAxisDescriptorSeries(title: string | null, summary: string | null, xAxis: AXDataAxisDescriptor, yAxis: AXNumericDataAxisDescriptor | null, series: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithAttributedTitleSummaryXAxisDescriptorYAxisDescriptorSeries(attributedTitle: NSAttributedString | null, summary: string | null, xAxis: AXDataAxisDescriptor, yAxis: AXNumericDataAxisDescriptor, series: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithTitleSummaryXAxisDescriptorYAxisDescriptorAdditionalAxesSeries(title: string | null, summary: string | null, xAxis: AXDataAxisDescriptor, yAxis: AXNumericDataAxisDescriptor | null, additionalAxes: NSArray<interop.Object> | Array<interop.Object> | null, series: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithAttributedTitleSummaryXAxisDescriptorYAxisDescriptorAdditionalAxesSeries(attributedTitle: NSAttributedString | null, summary: string | null, xAxis: AXDataAxisDescriptor, yAxis: AXNumericDataAxisDescriptor | null, additionalAxes: NSArray<interop.Object> | Array<interop.Object> | null, series: NSArray<interop.Object> | Array<interop.Object>): this;

  setTitle(title: string | null): void;

  setAttributedTitle(attributedTitle: NSAttributedString | null): void;

  setSummary(summary: string | null): void;

  setContentDirection(contentDirection: interop.Enum<typeof AXChartDescriptorContentDirection>): void;

  setContentFrame(contentFrame: CGRect): void;

  setSeries(series: NSArray<interop.Object> | Array<interop.Object>): void;

  setXAxis(xAxis: AXDataAxisDescriptor): void;

  setYAxis(yAxis: AXNumericDataAxisDescriptor | null): void;

  setAdditionalAxes(additionalAxes: NSArray<interop.Object> | Array<interop.Object>): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class AXCategoricalDataAxisDescriptor extends NSObject implements AXDataAxisDescriptor {
  get categoryOrder(): NSArray;
  set categoryOrder(value: NSArray<interop.Object> | Array<interop.Object>);

  initWithTitleCategoryOrder(title: string, categoryOrder: NSArray<interop.Object> | Array<interop.Object>): this;

  initWithAttributedTitleCategoryOrder(attributedTitle: NSAttributedString, categoryOrder: NSArray<interop.Object> | Array<interop.Object>): this;

  setCategoryOrder(categoryOrder: NSArray<interop.Object> | Array<interop.Object>): void;

  title: string;

  attributedTitle: NSAttributedString;

  setTitle(title: string): void;

  setAttributedTitle(attributedTitle: NSAttributedString): void;

  copyWithZone(zone: interop.PointerConvertible): interop.Object;
}

declare class AXMathExpressionNumber extends AXMathExpression {
  initWithContent(content: string): this;

  readonly content: string;
}

declare class AXMathExpression extends NSObject {
}

