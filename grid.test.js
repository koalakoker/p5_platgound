function gridTests() {
  it("Grid tests", () => {
    const tSpace = rnd(0, 100);
    const grid = new Grid(tSpace);
    assert.equal(grid.space, tSpace);
    assert.isFalse(grid.active);
    grid.active = true;
    const tX = rnd(0, 800);
    const tY = rnd(0, 400);
    const tPoint = grid.snap(tX, tY);
    const iDivx = Math.floor(tPoint.x / tSpace);
    const iDivy = Math.floor(tPoint.y / tSpace);
    assert.equal(tPoint.x, iDivx * tSpace);
    assert.equal(tPoint.y, iDivy * tSpace);
  });
}
