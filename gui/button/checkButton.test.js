function checkButtonTests() {
  it("Check button tests", () => {
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
}
