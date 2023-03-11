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
      cB.click(true)
        .then(() => {
          assert.notDeepEqual(cB.fillColor, cB.clickColor());

          assert.isTrue(cB.selected);
          cB.click(false)
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
    cBTestMouseMoveOutside(cB);
    cBTestMouseMoveInside(cB);
    cBTestMouseMoveAfterCheck(cB);
  });
}

function cBTestMouseMoveOutside(cB) {
  const mx = cB.x - 5;
  const my = cB.y - 5;
  cB.mouseMoved(mx, my);
  assert.equal(cB.lastX, mx);
  assert.equal(cB.lastY, my);
  assert.deepEqual(cB.fillColor, cB.normalColor());
}

function cBTestMouseMoveInside(cB) {
  const mx = cB.x + 5;
  const my = cB.y + 5;
  cB.mouseMoved(mx, my);
  assert.equal(cB.lastX, mx);
  assert.equal(cB.lastY, my);
  assert.deepEqual(cB.fillColor, cB.overColor());
}

function cBTestMouseMoveAfterCheck(cB) {
  const mx = cB.x + 5;
  const my = cB.y + 5;
  cB.mousePressed(mx, my);
  cB.mouseMoved(mx, my);
  assert.equal(cB.lastX, mx);
  assert.equal(cB.lastY, my);
  assert.deepEqual(cB.fillColor, cB.clickColor());
}
