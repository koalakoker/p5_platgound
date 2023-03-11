function barTest() {
  it("Bar", () => {
    const xPos = iRand(0, 1000);
    const yPos = iRand(0, 1000);
    const bar = new Bar(null, xPos, yPos);
    const pB = new PushButton(bar, "", () => {
      console.log("Pushed");
    });
    bar.append(pB);

    let el;
    el = bar.element(-1);
    assert.isUndefined(el);
    el = bar.element(1);
    assert.isUndefined(el);
    el = bar.element(0);
    assert.equal(el, pB);

    bar.mouseMoved(xPos + 5, yPos + 5);
    assert.deepEqual(pB.fillColor, pB.overColor());

    bar.mousePressed(xPos + 5, yPos + 5);
  });
}
