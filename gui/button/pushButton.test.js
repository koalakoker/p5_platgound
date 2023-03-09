function pushButtonTest() {
  it("Test", () => {
    return new Promise((resolve, reject) => {
      let push = 0;
      const pushButton = new PushButton(null, "", () => {
        push++;
        if (push === 2) {
          resolve();
        }
      });
      assert.isTrue(isTypeOf(pushButton, PushButton));
      pushButton.activate();
      pushButton.mousePressed(pushButton.x + 5, pushButton.y + 5);
      reject("Push check failed");
    });
  });
}
