function observerTest() {
  it("Instantiate and callback", () => {
    const message = "Test message";
    return new Promise((resolve, reject) => {
      const ob = new Observer((msg) => {
        assert.equal(msg, message);
        resolve();
      });
      ob.update(message);
      reject();
    });
  });
}
