function drawingTest() {
  it("Load", () => {
    const drawing = new Drawing();
    return drawing.load();
  });
  it("Save", async function () {
    return new Promise(async (resolve, reject) => {
      const drawing = new Drawing();
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
  it("Create random save", () => {
    const randomDraw = createRandomDraw(800, 600);
    return randomDraw.save();
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

function rnd(min, max) {
  return Math.floor(rand(min, max));
}

function rndColor() {
  return color(rnd(0, 255), rnd(0, 255), rnd(0, 255), rnd(0, 255));
}
