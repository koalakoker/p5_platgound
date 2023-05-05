function editElementTests() {
  const initTxt = "";
  const pX = rand(0, 1000);
  const pY = rand(0, 1000);
  const x = rand(0, 1000);
  const y = rand(0, 1000);
  const w = rand(0, 500);
  const h = rand(0, 500);
  const parent = new GElem(null, pX, pY, 0, 0);

  it("constructor", () => {
    const eE = new EditElement(parent, x, y, w, h, initTxt);
    assert.equal(eE.getX(), pX + x);
    assert.equal(eE.getY(), pY + y);
    assert.equal(eE.w, w);
    assert.equal(eE.h, h);
    assert.equal(eE.editedText(), initTxt);
  });
  it("setText", () => {
    const eE = new EditElement(parent, x, y, w, h, initTxt);
    const newTxt = "Hello W!";
    eE.setEditedText(newTxt);
    assert.equal(eE.editedText(), newTxt);
  });
}
