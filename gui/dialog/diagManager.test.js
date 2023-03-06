function diagManagerTests() {
  it("instance", () => {
    const diagMngr = new DiagManager();
    assert.deepEqual(diagMngr.dialogs, []);
  });
  it("Message test", () => {
    const diagMngr = new DiagManager();
    const duration = 1000;
    const fade = 200;
    diagMngr.addMessage("Test", duration, fade);
    assert.equal(diagMngr.dialogs.length, 1);
    diagMngr.display();
    const diag = diagMngr.activeDiag();
    const margin = 10;
    simulateWait(diag, duration + fade + fade);
    assert.equal(diagMngr.dialogs.length, 1);
    simulateWait(diag, margin);
    assert.equal(diagMngr.dialogs.length, 0);
  });
  it("Error test", () => {
    const diagMngr = new DiagManager();
    const duration = 1000;
    const fade = 200;
    diagMngr.addError("Test", duration, fade);
    assert.equal(diagMngr.dialogs.length, 1);
    diagMngr.display();
    const diag = diagMngr.activeDiag();
    const margin = 10;
    simulateWait(diag, duration + fade + fade);
    assert.equal(diagMngr.dialogs.length, 1);
    simulateWait(diag, margin);
    assert.equal(diagMngr.dialogs.length, 0);
  });
}

function simulateWait(diag, msec) {
  for (let i = 0; i < msec; i++) {
    diag.tween.update(1);
  }
}
