function barTest() {
  it("Bar mouse interactions", () => {
    return new Promise((resolve, reject) => {
      let pushNumber = 0;
      const xPos = iRand(0, 1000);
      const yPos = iRand(0, 1000);
      const bar = new Bar(null, xPos, yPos);
      const pB = new PushButton(bar, "", () => {
        pushNumber++;
      });
      bar.append(pB);

      const checkInside = bar.inside(xPos + 5, yPos + 5);
      assert.isTrue(checkInside);

      const checkOutSide = bar.inside(xPos - 5, yPos + 5);
      assert.isFalse(checkOutSide);

      bar.mouseMoved(xPos + 5, yPos + 5);
      assert.deepEqual(pB.fillColor, pB.overColor());

      bar.mousePressed(xPos + 5, yPos + 5);
      assert.deepEqual(pB.fillColor, pB.clickColor());

      bar.mouseReleased(xPos + 5, yPos + 5);

      if (pushNumber === 1) {
        resolve();
      } else {
        reject();
      }
    });
  });
  it("Test multiple element", () => {
    const bar = new Bar(null, 0, 0);

    const items = iRand(3, 15);
    const tElems = [];
    for (let i = 0; i < items; i++) {
      const pB = new PushButton(bar, "");
      bar.append(pB);
      tElems.push(pB);
    }
    let el;
    el = bar.element(-1);
    assert.isUndefined(el);
    el = bar.element(tElems.length);
    assert.isUndefined(el);
    for (let i = 0; i < items; i++) {
      el = bar.element(i);
      assert.equal(el, tElems[i]);
    }
  });
}
