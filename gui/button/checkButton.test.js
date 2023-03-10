function checkButtonTests() {
  it("Click", () => {
    let selChanged = false;
    return new Promise((resolve, reject) => {
      const checkButton = new CheckButton(null, "", () => {
        selChanged = true;
      });
      assert.isFalse(checkButton.selected);
      checkButton
        .click(true)
        .then(() => {
          assert.notDeepEqual(checkButton.fillColor, checkButton.clickColor());

          assert.isTrue(checkButton.selected);
          checkButton
            .click(false)
            .then(() => {
              assert.isTrue(selChanged);
              resolve();
            })
            .catch((err) => reject(err));
          assert.notDeepEqual(checkButton.fillColor, checkButton.clickColor());
          assert.isTrue(checkButton.isDebounce());
        })
        .catch((err) => reject(err));
      assert.deepEqual(checkButton.fillColor, checkButton.clickColor());
      assert.isTrue(checkButton.isDebounce());
    });
  });
  it("MousePressed", () => {
    const checkButton = new CheckButton(null, "");
    let isInside = checkButton.mousePressed(
      checkButton.x + 5,
      checkButton.y + 5
    );
    assert.isTrue(isInside);
    isInside = checkButton.mousePressed(checkButton.x - 5, checkButton.y - 5);
    assert.isFalse(isInside);
    isInside = checkButton.mousePressed(checkButton.x + 5, checkButton.y + 5);
    assert.isFalse(isInside);
  });
}
