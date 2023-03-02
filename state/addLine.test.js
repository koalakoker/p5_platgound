function addLineTests() {
  it("Add line state tests", () => {
    const tDrw = Drawing.getInstance();
    tDrw.clear();
    const sAddLine = new StateAddLine();
    const firstPoint = { x: 400, y: 300 };
    const secondPoint = { x: 455, y: 300 };
    mouseX = firstPoint.x;
    mouseY = firstPoint.y;
    sAddLine.mousePressed();
    mouseX = secondPoint.x;
    mouseY = secondPoint.y;
    sAddLine.mouseDragged();
    sAddLine.mouseReleased();
    assert.equal(tDrw.getElements().length, 1);
    const newElem = tDrw.getElements()[0];
    assert.isTrue(Line.prototype.isPrototypeOf(newElem));
    assert.equal(newElem.x1, firstPoint.x);
    assert.equal(newElem.y1, firstPoint.y);
    assert.equal(newElem.x2, 460);
    assert.equal(newElem.y2, secondPoint.y);
  });
}