function drawingTest() {
  it("Setup and mouse interaction", () => {
    const draw = Drawing.getInstance();
    assert.isUndefined(draw.grid);
    assert.isUndefined(draw.newElementStyle);
    assert.isUndefined(draw.state);
    draw.setup();
    assert.isTrue(Grid.prototype.isPrototypeOf(draw.grid));
    assert.isTrue(Style.prototype.isPrototypeOf(draw.newElementStyle));
    assert.isTrue(StateSelect.prototype.isPrototypeOf(draw.state));

    // After setup is possible to set a different state and simulate mouse interaction

    draw.changeState(new StateAddCircle());
    mouseX = 400;
    mouseY = 300;
    draw.mousePressed();
    console.log("Mouse pressed");
    mouseX = 450;
    draw.mouseDragged();
    draw.mouseReleased();

    console.log(draw.drawElements);
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
  it("Load", () => {
    const drawing = Drawing.getInstance();
    return drawing.load();
  });
  it("Save", async function () {
    return new Promise(async (resolve, reject) => {
      const drawing = Drawing.getInstance();
      try {
        await drawing.load();
        // Test save writing different values
        const testDrawSaved = createRandomDraw(800, 600);
        const testDrawLoaded = createRandomDraw(800, 600);
        assert.notEqual(
          JSON.stringify(testDrawSaved),
          JSON.stringify(testDrawLoaded)
        );
        await testDrawSaved.save();
        await testDrawLoaded.load();
        // Restore original values
        await drawing.save();
        assert.equal(
          JSON.stringify(testDrawSaved),
          JSON.stringify(testDrawLoaded)
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
  // it("Create random save", () => {
  //   const randomDraw = createRandomDraw(800, 600);
  //   return randomDraw.save();
  // });
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
function rnd(min, max) {
  return Math.floor(rand(min, max));
}
function rndColor() {
  return color(rnd(0, 255), rnd(0, 255), rnd(0, 255), rnd(0, 255));
}
