let sketch = function () {};
const p5js = new p5(sketch);

const assert = chai.assert;
describe("KeyLogger", keyLoggerTest);
describe("KeyState", checkKeyStateIsEqualMethod);
describe("Observer", observerTest);
describe("ShortCut", checkKeyLoggerAndShortCutOpeartions);
describe("Subject", subjectTests);

describe("Style", styleTests);
describe("Circle", circleTests);
describe("Rectangle", rectangleTests);
describe("Line", lineTests);
describe("Control", controlTests);

describe("State Add", addTests);
describe("State Add Circle", addCircleTests);
describe("State Add Line", addLineTests);
describe("State Add Rect", addRectTests);

describe("PushButton", pushButtonTest);
describe("CheckButton", checkButtonTests);
describe("Slider", sliderTest);
describe("ColorPickerAlpha", colorPickerAlphaTest);
//describe("ColorPicker", colorPickerTest);
//describe("LinePicker", linePickerTest);
describe("Bar", barTest);
describe("Group", groupTest);
describe("DropDownBar", dropDownBarTest);
describe("Message", messageTests);
describe("Hints", hintsTests);
describe("DiagManager", diagManagerTests);
describe("Gui", guiTests);

describe("Grid", gridTests);
describe("Store", storeTests);
describe("Drawing", drawingTest);
