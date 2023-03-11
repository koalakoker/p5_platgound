function checkButtonTests() {
  it("Click", () => {
    let selChanged = false;
    return new Promise((resolve, reject) => {
      const cB = new CheckButton(null, "", () => {
        selChanged = true;
      });
      assert.isTrue(isTypeOf(cB, CheckButton));
      assert.deepEqual(cB.fillColor, cB.normalColor());
      assert.isFalse(cB.selected);
      cB.click(true, 5)
        .then(() => {
          assert.notDeepEqual(cB.fillColor, cB.clickColor());

          assert.isTrue(cB.selected);
          cB.click(false, 5)
            .then(() => {
              assert.isTrue(selChanged);
              resolve();
            })
            .catch((err) => reject(err));
          assert.notDeepEqual(cB.fillColor, cB.clickColor());
          assert.isTrue(cB.isDebounce());
        })
        .catch((err) => reject(err));
      assert.deepEqual(cB.fillColor, cB.clickColor());
      assert.isTrue(cB.isDebounce());
    });
  });
  it("Mouse pressed", () => {
    const checkButton = new CheckButton(null, "");
    let isInside;
    isInside = checkButton.mousePressed(checkButton.x - 5, checkButton.y - 5);
    assert.isFalse(isInside);
    isInside = checkButton.mousePressed(checkButton.x + 5, checkButton.y + 5);
    assert.isTrue(isInside);
    isInside = checkButton.mousePressed(checkButton.x + 5, checkButton.y + 5);
    assert.isFalse(isInside);
  });
  it("Mouse moved", () => {
    const cB = new CheckButton(null, "");
    bTestMouseMoveOutside(cB);
    bTestMouseMoveInside(cB);
    bTestMouseMoveAfterCheck(cB);
  });
}
