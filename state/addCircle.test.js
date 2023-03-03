function addCircleTests() {
  it("Add circle state tests", () => {
    const tDrw = Drawing.getInstance();
    tDrw.clear();
    tDrw.grid.deActivate();
    const sAddCircle = new StateAddCircle();
    const firstPoint = { x: 400, y: 300 };
    const secondPoint = { x: 455, y: 300 };
    mouseX = firstPoint.x;
    mouseY = firstPoint.y;
    sAddCircle.mousePressed();
    mouseX = secondPoint.x;
    mouseY = secondPoint.y;
    sAddCircle.mouseDragged();
    sAddCircle.mouseReleased();
    assert.equal(tDrw.getElements().length, 1);
    const newElem = tDrw.getElements()[0];
    assert.isTrue(isTypeOf(newElem, Circle));
    assert.equal(newElem.x, firstPoint.x);
    assert.equal(newElem.y, firstPoint.y);
    assert.equal(newElem.r, 55);
  });
}
