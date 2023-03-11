function pushButtonTest() {
  it("Test", () => {
    return new Promise((resolve, reject) => {
      let push = 0;
      const pB = new PushButton(null, "", () => {
        push++;
        if (push === 2) {
          resolve();
        }
      });
      assert.isTrue(isTypeOf(pB, PushButton));
      assert.deepEqual(pB.fillColor, pB.normalColor());
      pB.click();
      pB.mousePressed(pB.x + 5, pB.y + 5);
      reject("Push check failed");
    });
  });
}
