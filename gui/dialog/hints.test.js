function hintsTests() {
  it("Hints tests", () => {
    const duration = 3000;
    const fadeIn = 200;
    const fadeOut = 200;
    const margin = 10;
    const hints = new Hints();
    assert.isArray(hints.messages);
    const gui = Gui.getInstance();
    gui.diagMngr.display();
    const msg = gui.diagMngr.activeDiag();
    simulateWait(msg, duration + fadeIn + fadeOut);
    assert.equal(gui.diagMngr.dialogs.length, 1);
    simulateWait(msg, margin);
    assert.equal(gui.diagMngr.dialogs.length, 0);
  });
}
