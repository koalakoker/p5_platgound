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
    const diag = diagMngr.activeDiag();
    const margin = 10;
    simulateWait(diag, fade + duration + fade);
    assert.equal(diagMngr.dialogs.length, 1);
    simulateWait(diag, margin);
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
  it("Error test", () => {
    const messageText = "MessageText";
    const errorText1 = "ErrorText1";
    const errorText2 = "ErrorText2";
    let diag;

    const diagMngr = new DiagManager();
    diagMngr.addMessage(messageText, duration, fade);
    assert.equal(diagMngr.dialogs.length, 1);
    diag = diagMngr.activeDiag();
    assert.equal(diag.text, messageText);

    diagMngr.display();
    simulateWait(diag, fade + duration / 2);

    diagMngr.addError(errorText1, duration, fade);
    assert.equal(diagMngr.dialogs.length, 2);
    diag = diagMngr.activeDiag();
    assert.equal(diag.text, errorText1);

    diagMngr.display();
    simulateWait(diag, fade + duration / 2);

    diagMngr.addError(errorText2, duration, fade);
    assert.equal(diagMngr.dialogs.length, 3);
    diag = diagMngr.activeDiag();
    assert.equal(diag.text, errorText1);

    simulateWait(diag, duration / 2 + fade + margin);
    assert.equal(diagMngr.dialogs.length, 2);
    diag = diagMngr.activeDiag();
    assert.equal(diag.text, errorText2);

    diagMngr.display();
    simulateWait(diag, fade + duration + fade + margin);
    assert.equal(diagMngr.dialogs.length, 1);
    diag = diagMngr.activeDiag();
    assert.equal(diag.text, messageText);

    diagMngr.display();
    simulateWait(diag, fade + duration + fade + margin);
    assert.equal(diagMngr.dialogs.length, 0);
  });
}
