function colorPickerAlphaTest() {
  it("Constructor", () => {
    const r = iRand(0, 255);
    const g = iRand(0, 255);
    const b = iRand(0, 255);
    const a = iRand(0, 255);
    const cPA = new ColorPickerAlpha(null, p5js.color(r, g, b, a));
    const color = cPA.color();
    assert.equal(p5js.red(color), r);
    assert.equal(p5js.green(color), g);
    assert.equal(p5js.blue(color), b);
    assert.equal(p5js.alpha(color), a);
  });
  it("Modify", () => {
    const r = iRand(0, 255);
    const g = iRand(0, 255);
    const b = iRand(0, 255);
    const a = iRand(0, 255);
    const cPA = new ColorPickerAlpha(null, p5js.color(r, g, b, a), (color) => {
      assert.equal(p5js.red(color), 10);
      assert.equal(p5js.green(color), 20);
      assert.equal(p5js.blue(color), 30);
      assert.equal(p5js.alpha(color), 40);
    });
    cPA.setColor(p5js.color(10, 20, 30, 40));
  });
  it("Slider", () => {
    let r = iRand(0, 255);
    let g = iRand(0, 255);
    let b = iRand(0, 255);
    let a = iRand(0, 255);
    let setColor = p5js.color(r, g, b, a);
    const cPA = new ColorPickerAlpha(null, setColor);
    assert.equal(cPA.percentage2Color(cPA.rSlider.percentage()), r);
    assert.equal(cPA.percentage2Color(cPA.gSlider.percentage()), g);
    assert.equal(cPA.percentage2Color(cPA.bSlider.percentage()), b);
    assert.equal(cPA.percentage2Color(cPA.aSlider.percentage()), a);

    let getColor = cPA.slidersColor();
    assert.deepEqual(setColor, getColor);

    r = iRand(0, 255);
    g = iRand(0, 255);
    b = iRand(0, 255);
    a = iRand(0, 255);
    setColor = p5js.color(r, g, b, a);
    cPA.setSliders(setColor);
    assert.equal(cPA.percentage2Color(cPA.rSlider.percentage()), r);
    assert.equal(cPA.percentage2Color(cPA.gSlider.percentage()), g);
    assert.equal(cPA.percentage2Color(cPA.bSlider.percentage()), b);
    assert.equal(cPA.percentage2Color(cPA.aSlider.percentage()), a);
    getColor = cPA.slidersColor();
    assert.deepEqual(setColor, getColor);
  });
}
