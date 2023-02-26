function drawingTest() {
  it("Load", () => {
    const drawing = new Drawing(400, 400);
    return drawing.load();
  });
  it("Save", async function () {
    return new Promise(async (resolve, reject) => {
      const drawing = new Drawing(0, 0);
      try {
        await drawing.load();
        // Test save writing different values
        const testDrawSaved = createRandomDraw();
        const testDrawLoaded = createRandomDraw();
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
  //   const randomDraw = createRandomDraw();
  //   return randomDraw.save();
  // });
}

function createRandomDraw() {
  const max = 600;
  const draw = new Drawing(rnd(0, max), rnd(0, max));
  for (let i = 0; i < Math.floor(rand(10, 50)); i++) {
    draw.addNewElement(
      new Circle(rnd(0, max), rnd(0, max), rnd(20, 100)).addStyle(rndStyle())
    );
    draw.addNewElement(
      new Line(rnd(0, max), rnd(0, max), rnd(0, max), rnd(0, max)).addStyle(
        rndStyle()
      )
    );
    draw.addNewElement(
      new Rectangle(
        rnd(0, max),
        rnd(0, max),
        rnd(0, max),
        rnd(0, max)
      ).addStyle(rndStyle())
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
