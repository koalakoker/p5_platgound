function messageTests() {
  it("Message tests", () => {
    return new Promise((resolve, reject) => {
      const duration = 1500;
      const fadeIn = 300;
      const fadeOut = 200;
      const margin = 10;
      const testText = "Test";
      const msg = new Message(
        testText,
        duration,
        p5js.color(1, 2, 3),
        () => {
          resolve();
        },
        fadeIn,
        fadeOut
      );
      assert.equal(msg.text, testText);
      assert.isTrue(msg.notStarted());
      msg.start();
      assert.isFalse(msg.notStarted());
      simulateWait(msg, duration + fadeIn + fadeOut);
      assert.isFalse(msg.end);
      simulateWait(msg, margin);
      reject();
    });
  });
}
