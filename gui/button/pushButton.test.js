function pushButtonTest() {
  it("Click", () => {
    let pushed = false;
    return new Promise((resolve, reject) => {
      const pB = new PushButton(null, "", () => {
        pushed = true;
      });
      assert.isTrue(isTypeOf(pB, PushButton));
      assert.deepEqual(pB.fillColor, pB.normalColor());

      pB.click(10)
        .then(() => {
          assert.notDeepEqual(pB.fillColor, pB.clickColor());
          assert.isTrue(pushed);
          resolve();
        })
        .catch((err) => reject(err));
      assert.deepEqual(pB.fillColor, pB.clickColor());
      assert.isTrue(pB.isDebounce());
    });
  });
  it("Mouse pressed", () => {
    const pB = new PushButton(null, "");
    let isInside;
    isInside = pB.mousePressed(pB.x - 5, pB.y - 5);
    assert.isFalse(isInside);
    isInside = pB.mousePressed(pB.x + 5, pB.y + 5);
    assert.isTrue(isInside);
    isInside = pB.mousePressed(pB.x + 5, pB.y + 5);
    assert.isTrue(isInside);
  });
  it("Mouse moved", () => {
    const pB = new PushButton(null, "");
    bTestMouseMoveOutside(pB);
    bTestMouseMoveInside(pB);
    bTestMouseMoveAfterCheck(pB);
  });
}
