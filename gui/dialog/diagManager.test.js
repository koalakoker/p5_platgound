function diagManagerTests() {
  const duration = 1000;
  const fade = 200;
  const margin = 10;

  it("instance", () => {
    const diagMngr = new DiagManager();
    assert.deepEqual(diagMngr.dialogs, []);
  });
  it("Message test", () => {
    const diagMngr = new DiagManager();
    diagMngr.addMessage("Test", duration, fade);
    assert.equal(diagMngr.dialogs.length, 1);
    diagMngr.display();
    const margin = 10;
    simulateWait(diagMngr, fade + duration + fade);
    assert.equal(diagMngr.dialogs.length, 1);
    simulateWait(diagMngr, margin);
    assert.equal(diagMngr.dialogs.length, 0);
  });
  it("Find first diag with priority", () => {
    const diagMngr = new DiagManager();
    diagMngr.addError("e1", duration, fade);
    diagMngr.addMessage("m1", duration, fade);
    diagMngr.addMessage("m2", duration, fade);
    diagMngr.addMessage("m3", duration, fade);
    diagMngr.addError("e2", duration, fade);
    diagMngr.addError("e3", duration, fade);
    assert.equal(diagMngr.dialogs[0].text, "e1");
    assert.equal(diagMngr.dialogs[1].text, "e2");
    assert.equal(diagMngr.dialogs[2].text, "e3");
    assert.equal(diagMngr.dialogs[3].text, "m1");
    assert.equal(diagMngr.dialogs[4].text, "m2");
    assert.equal(diagMngr.dialogs[5].text, "m3");
  });
  it("Stop displaying the active message and reset the tween", () => {
    const diagMngr = new DiagManager();
    diagMngr.stopDisplayingTheActiveMessageAndResetTween();
    diagMngr.addMessage("m1", duration, fade);
    diagMngr.display();
    simulateWait(diagMngr, fade + duration / 2);
    assert.isFalse(diagMngr.activeDiag().isPaused());
    diagMngr.stopDisplayingTheActiveMessageAndResetTween();
    assert.isTrue(diagMngr.activeDiag().isPaused());
  });
  it("Error test", () => {
    return new Promise((resolve, reject) => {
      const messageText = "MessageText";
      const errorText1 = "ErrorText1";
      const errorText2 = "ErrorText2";
      const completedMessages = [];

      const correctOrder = [];
      correctOrder.push(errorText1);
      correctOrder.push(errorText2);
      correctOrder.push(messageText);

      const diagMngr = new DiagManager();
      diagMngr.addMessage(messageText, duration, fade, () => {
        completedMessages.push(messageText);
        assert.deepEqual(completedMessages, correctOrder);
        resolve();
      });
      assert.equal(diagMngr.dialogs.length, 1);

      assert.equal(diagMngr.activeMessage(), messageText);

      diagMngr.display();
      simulateWait(diagMngr, fade + duration / 2);

      diagMngr.addError(errorText1, duration, fade, () => {
        completedMessages.push(errorText1);
      });
      assert.equal(diagMngr.dialogs.length, 2);

      assert.equal(diagMngr.activeMessage(), errorText1);

      diagMngr.display();
      simulateWait(diagMngr, fade + duration / 2);

      diagMngr.addError(errorText2, duration, fade, () => {
        completedMessages.push(errorText2);
      });
      assert.equal(diagMngr.dialogs.length, 3);

      assert.equal(diagMngr.activeMessage(), errorText1);

      simulateWait(diagMngr, duration / 2 + fade + margin);
      assert.equal(diagMngr.dialogs.length, 2);

      assert.equal(diagMngr.activeMessage(), errorText2);

      diagMngr.display();
      simulateWait(diagMngr, fade + duration + fade + margin);
      assert.equal(diagMngr.dialogs.length, 1);

      assert.equal(diagMngr.activeMessage(), messageText);

      diagMngr.display();
      simulateWait(diagMngr, fade + duration + fade + margin);
      assert.equal(diagMngr.dialogs.length, 0);
    });
  });
}
