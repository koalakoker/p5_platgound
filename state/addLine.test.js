function addLineTests() {
  it("Add line state tests", () => {
    const tDrw = Drawing.getInstance();
    tDrw.clear();
    tDrw.grid.deActivate();
    const sAddLine = new StateAddLine();
    const firstPoint = { x: 400, y: 300 };
    const secondPoint = { x: 455, y: 300 };
    let mouseX = firstPoint.x;
    let mouseY = firstPoint.y;
    sAddLine.mousePressed(mouseX, mouseY);
    mouseX = secondPoint.x;
    mouseY = secondPoint.y;
    sAddLine.mouseDragged(mouseX, mouseY);
    sAddLine.mouseReleased(mouseX, mouseY);
    assert.equal(tDrw.getElements().length, 1);
    const newElem = tDrw.getElements()[0];
    assert.isTrue(isTypeOf(newElem, Line));
    assert.equal(newElem.x1, firstPoint.x);
    assert.equal(newElem.y1, firstPoint.y);
    assert.equal(newElem.x2, secondPoint.x);
    assert.equal(newElem.y2, secondPoint.y);
  });
}
