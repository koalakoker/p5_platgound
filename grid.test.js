function gridTests() {
  it("Grid tests", () => {
    const tSpace = rnd(0, 100);
    const grid = new Grid(tSpace);
    assert.equal(grid.space, tSpace);

    assert.isTrue(grid.active);
    const tX = rnd(0, 800);
    const tY = rnd(0, 400);
    let tPoint = grid.snap(tX, tY);
    const iDivx = Math.floor(tPoint.x / tSpace);
    const iDivy = Math.floor(tPoint.y / tSpace);
    assert.equal(tPoint.x, iDivx * tSpace);
    assert.equal(tPoint.y, iDivy * tSpace);

    grid.deActivate();
    assert.isFalse(grid.active);
    tPoint = grid.snap(tX, tY);
    assert.equal(tPoint.x, tX);
    assert.equal(tPoint.y, tY);

    grid.activate();
    assert.isTrue(grid.active);
    grid.deActivate();
  });
}
