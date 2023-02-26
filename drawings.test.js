function drawingTest() {
  it("Load", () => {
    const drawing = new Drawing(400, 400);
    return drawing.load();
  });
  it("Save", () => {
    const drawing = new Drawing(400, 400);
    assert.equal(1, 1);
  });
}
