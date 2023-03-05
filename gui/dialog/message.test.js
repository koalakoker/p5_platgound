let msg;

function messageTests() {
  it("Message tests", () => {
    const testText = "Test";
    msg = new Message(
      testText,
      2000,
      p5js.color(1, 2, 3),
      () => {
        console.log("End");
      },
      200,
      200
    );
    assert.equal(msg.text, testText);
    assert.isTrue(msg.notStarted());
    msg.show();
    assert.isFalse(msg.notStarted());
  });
}
