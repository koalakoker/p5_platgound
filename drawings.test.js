function drawingTest() {
  it("Load", () => {
    const drawing = new Drawing(400, 400);
    return drawing.load();
  });
  it("Save", async function () {
    return new Promise(async (resolve, reject) => {
      const drawing = new Drawing(400, 400);
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
  it("Create random save", () => {
    const randomDraw = createRandomDraw();
    return randomDraw.save();
  });
}

function createRandomDraw() {
  const max = 600;
  const draw = new Drawing(Math.floor(rand(0, max)), Math.floor(rand(0, max)));
  for (let i = 0; i < Math.floor(rand(10, 50)); i++) {
    draw.addNewElement(
      new Circle(
        Math.floor(rand(0, max)),
        Math.floor(rand(0, max)),
        Math.floor(rand(0, max))
      )
    );
    draw.addNewElement(
      new Line(
        Math.floor(rand(0, max)),
        Math.floor(rand(0, max)),
        Math.floor(rand(0, max)),
        Math.floor(rand(0, max))
      )
    );
    draw.addNewElement(
      new Rectangle(
        Math.floor(rand(0, max)),
        Math.floor(rand(0, max)),
        Math.floor(rand(0, max)),
        Math.floor(rand(0, max))
      )
    );
  }
  return draw;
}
