function colorPickerTest() {
  it("Test", () => {
    const color = iRand(0, 255);
    const cP = new ColorPicker(null, color);
    assert.equal(cP.color, color);
    assert.isFalse(cP.transparent);
    assert.isTrue(isTypeOf(cP.bSlider, Slider));
    assert.isTrue(isTypeOf(cP.cTransparent, TransparentCheck));
    assert.equal(cP.bValue, p5js.brightness(color));

    cP.display();
  });
  it("Parent interaction", () => {
    const cP = new ColorPicker(null, 255);
    pMousePressedTest(cP);
    pMouseMoved(cP);
  });
  it("Select color", () => {
    const cP = new ColorPicker(null, 255);
    cPmousePressedOnPicker(cP);
  });
}

function cPmousePressedOnSlider(cP) {}
function cPmousePressedOnCheck(cP) {}
function cPmousePressedOnPicker(cP) {
  pMousePressedTest(cP);
  assert.isTrue(cP.selected);
  p5js.colorMode(p5js.RGB);
  const testColor = p5js.color(10, 20, 30);
  console.log(p5js.red(testColor), p5js.green(testColor), p5js.blue(testColor));

  const h = p5js.hue(testColor);
  const s = p5js.saturation(testColor);
  const b = p5js.brightness(testColor);
  console.log(h, s, b);

  p5js.colorMode(p5js.HSB);
  const colHSB = p5js.color(h, s, b);
  p5js.colorMode(p5js.RGB);

  console.log(
    Math.floor(p5js.red(colHSB)),
    Math.floor(p5js.green(colHSB)),
    Math.floor(p5js.blue(colHSB))
  );

  const pX = cP.basePoint().x + h;
  const pY = cP.basePoint().y + s;
  cP.bSlider.value = b;

  cP.mousePressed(pX, pY);

  assert.isTrue(sameColor(cP.color, testColor));
}

function cPmouseReleasedTest(cP) {}

function cPmouseDraggedtest(cP) {
  cP;
}

function sameColor(c1, c2) {
  console.log(Math.floor(p5js.red(c1)), Math.floor(p5js.red(c2)));
  console.log(Math.floor(p5js.green(c1)), Math.floor(p5js.green(c2)));
  console.log(Math.floor(p5js.blue(c1)), Math.floor(p5js.blue(c2)));
  return (
    Math.floor(p5js.red(c1)) === Math.floor(p5js.red(c2)) &&
    Math.floor(p5js.green(c1)) === Math.floor(p5js.green(c2)) &&
    Math.floor(p5js.blue(c1)) === Math.floor(p5js.blue(c2))
  );
}
