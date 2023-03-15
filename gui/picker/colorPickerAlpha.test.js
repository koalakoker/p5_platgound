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
  });
  it("SetColor", () => {
    const firstColor = p5js.color(1, 2, 3, 4);
    const secondColor = p5js.color(11, 22, 33, 34);
    const cPA = new ColorPickerAlpha(null, firstColor);
    assert.deepEqual(toRGBA(cPA.color()), toRGBA(firstColor));
    cPA.setColor(secondColor);
    assert.deepEqual(toRGBA(cPA.color()), toRGBA(secondColor));
  });
  it("Callback", () => {
    let change = 0;
    const firstColor = p5js.color(1, 2, 3, 4);
    const secondColor = p5js.color(11, 22, 33, 34);
    const tirdColor = p5js.color(111, 122, 133, 144);
    const cPA = new ColorPickerAlpha(null, firstColor, (col) => {
      switch (change) {
        case 0: {
          assert.deepEqual(toRGBA(col), toRGBA(tirdColor));
        }
        case 1: {
          tirdColor.setRed(100);
          assert.deepEqual(toRGBA(col), toRGBA(tirdColor));
        }
        case 2: {
          tirdColor.setGreen(200);
          assert.deepEqual(toRGBA(col), toRGBA(tirdColor));
        }
        case 3: {
          tirdColor.setBlue(50);
          assert.deepEqual(toRGBA(col), toRGBA(tirdColor));
        }
        case 4: {
          tirdColor.setAlpha(1);
          assert.deepEqual(toRGBA(col), toRGBA(tirdColor));
        }
      }
      change++;
    });

    cPA.setColor(secondColor, false);
    assert.deepEqual(toRGBA(cPA.color()), toRGBA(secondColor));
    cPA.setColor(tirdColor);
    assert.deepEqual(toRGBA(cPA.color()), toRGBA(tirdColor));

    cPA.rSlider.setColor(100);
    cPA.gSlider.setColor(200);
    cPA.bSlider.setColor(50);
    cPA.aSlider.setColor(1);
    assert.equal(change, 5);
  });
}
