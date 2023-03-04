function diagManagerTests() {
  it("instance", () => {
    const diagMngr = new DiagManager();
    assert.deepEqual(diagMngr.dialogs, []);
  });
  it("Message test", () => {
    const diagMngr = new DiagManager();
    diagMngr.addMessage("Test");
    diagMngr.display();
  });
}
