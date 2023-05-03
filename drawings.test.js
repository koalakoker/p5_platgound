function drawingTest() {
  it("Setup", async () => {
    const draw = Drawing.getInstance();
    assert.isTrue(isTypeOf(draw.grid, Grid));
    assert.isTrue(isTypeOf(draw.newElementStyle, Style));
    assert.isTrue(isTypeOf(draw.state, StateSelect));
    await draw.setup();
    assert.equal(Store.getInstance().currentIndex, -1);
  });
  it("Add circle and clear", () => {
    const draw = new Drawing(800, 600);
    const style = rndStyle();
    const px = 400;
    const py = 300;
    const r = 100;
    draw.addNewElement(new Circle(px, py, r).addStyle(style));
    const select = draw.elementsAtPoint(px, py);
    assert.equal(select.length, 1);
    const elem = select[0];
    assert.equal(elem.id, 2);
    assert.equal(elem.x, px);
    assert.equal(elem.y, py);
    assert.equal(elem.r, r);
    assert.deepEqual(elem.style, style);
    draw.clear();
    assert.equal(draw.drawElements.length, 0);
  });
  it("Add rectangle", () => {
    const draw = new Drawing(800, 600);
    const style = rndStyle();
    const px1 = 0;
    const py1 = 200;
    const px2 = 800;
    const py2 = 400;
    draw.addNewElement(new Rectangle(px1, py1, px2, py2).addStyle(style));
    const select = draw.elementsAtPoint(px1, py1);
    assert.equal(select.length, 1);
    const elem = select[0];
    assert.equal(elem.id, 3);
    assert.equal(elem.x1, px1);
    assert.equal(elem.y1, py1);
    assert.equal(elem.x2, px2);
    assert.equal(elem.y2, py2);
    assert.deepEqual(elem.style, style);
  });
  it("Add line", () => {
    const draw = new Drawing(800, 600);
    const style = rndStyle();
    const px1 = 0;
    const py1 = 300;
    const px2 = 800;
    const py2 = 300;
    draw.addNewElement(new Line(px1, py1, px2, py2).addStyle(style));
    const select = draw.elementsAtPoint(px1, py1 + 4);
    assert.equal(select.length, 1);
    const elem = select[0];
    assert.equal(elem.id, 1);
    assert.equal(elem.x1, px1);
    assert.equal(elem.y1, py1);
    assert.equal(elem.x2, px2);
    assert.equal(elem.y2, py2);
    assert.deepEqual(elem.style, style);
  });
  it("Force state select", () => {
    const drawing = Drawing.getInstance();
    drawing.changeState(new StateAddLine());
    assert.isTrue(isTypeOf(drawing.state, StateAddLine));
    drawing.forceStateSelect();
    assert.isTrue(isTypeOf(drawing.state, StateSelect));
  });
}

function createRandomDraw(w, h) {
  const draw = new Drawing(w, h);
  for (let i = 0; i < rnd(10, 50); i++) {
    draw.addNewElement(
      new Circle(rnd(0, w), rnd(0, h), rnd(20, 100)).addStyle(rndStyle())
    );
    draw.addNewElement(
      new Line(rnd(0, w), rnd(0, h), rnd(0, w), rnd(0, h)).addStyle(rndStyle())
    );
    draw.addNewElement(
      new Rectangle(rnd(0, w), rnd(0, h), rnd(0, w), rnd(0, h)).addStyle(
        rndStyle()
      )
    );
  }
  return draw;
}
function rndStyle() {
  const s = new Style();
  s.fill = true;
  s.fillColor = rndColor();
  s.stroke = true;
  s.strokeColor = rndColor();
  s.strokeWeight = rnd(1, 10);
  return s;
}
function rndColor() {
  return p5js.color(rnd(0, 255), rnd(0, 255), rnd(0, 255), rnd(0, 255));
}
function rnd(min, max) {
  return Math.floor(rand(min, max));
}
