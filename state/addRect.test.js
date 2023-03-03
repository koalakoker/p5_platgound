function addRectTests() {
  it("Add rect state tests", () => {
    const tDrw = Drawing.getInstance();
    tDrw.clear();
    tDrw.grid.deActivate();
    const sAddRect = new StateAddRect();
    const firstPoint = { x: 400, y: 300 };
    const secondPoint = { x: 455, y: 300 };
    mouseX = firstPoint.x;
    mouseY = firstPoint.y;
    sAddRect.mousePressed();
    mouseX = secondPoint.x;
    mouseY = secondPoint.y;
    sAddRect.mouseDragged();
    sAddRect.mouseReleased();
    assert.equal(tDrw.getElements().length, 1);
    const newElem = tDrw.getElements()[0];
    assert.isTrue(isTypeOf(newElem, Rectangle));
    assert.equal(newElem.x1, firstPoint.x);
    assert.equal(newElem.y1, firstPoint.y);
    assert.equal(newElem.x2, secondPoint.x);
    assert.equal(newElem.y2, secondPoint.y);
  });
}
