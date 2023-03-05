function addRectTests() {
  it("Add rect state tests", () => {
    const tDrw = Drawing.getInstance();
    tDrw.clear();
    tDrw.grid.deActivate();
    const sAddRect = new StateAddRect();
    const firstPoint = { x: 400, y: 300 };
    const secondPoint = { x: 455, y: 300 };
    let mouseX = firstPoint.x;
    let mouseY = firstPoint.y;
    sAddRect.mousePressed(mouseX, mouseY);
    mouseX = secondPoint.x;
    mouseY = secondPoint.y;
    sAddRect.mouseDragged(mouseX, mouseY);
    sAddRect.mouseReleased(mouseX, mouseY);
    assert.equal(tDrw.getElements().length, 1);
    const newElem = tDrw.getElements()[0];
    assert.isTrue(isTypeOf(newElem, Rectangle));
    assert.equal(newElem.x1, firstPoint.x);
    assert.equal(newElem.y1, firstPoint.y);
    assert.equal(newElem.x2, secondPoint.x);
    assert.equal(newElem.y2, secondPoint.y);
  });
}
