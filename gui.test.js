function guiTests() {
  it("Instancng", () => {
    const gui = Gui.getInstance();
    assert.isTrue(isTypeOf(gui, Gui));
    assert.isTrue(isTypeOf(gui.diagMngr, DiagManager));
    gui.preload(); // Calls init and create GUI elements
    assert.isTrue(isTypeOf(gui.mainBar, DropDownBar));
  });
  it("Setup and Displat", () => {
    const gui = Gui.getInstance();
    gui.setup();
    gui.display();
  });
  it("Add message", () => {
    return new Promise((resolve) => {
      const messageText = "Message text";
      const gui = Gui.getInstance();
      const diagMngr = gui.diagMngr;
      diagMngr.clear();
      gui.addMessage(messageText).then(() => {
        resolve();
      });
      assert.equal(diagMngr.activeMessage(), messageText);
      gui.display();
      simulateWait(diagMngr, 3500);
    });
  });
  it("Show backend not available error", () => {
    return new Promise((resolve) => {
      const gui = Gui.getInstance();
      const diagMngr = gui.diagMngr;
      diagMngr.clear();
      gui.showBackendNotAvailableError().then(() => {
        resolve();
      });
      assert.isString(diagMngr.activeMessage());
      gui.display();
      simulateWait(diagMngr, 5500);
    });
  });
  it("Reset add bar", () => {
    const gui = Gui.getInstance();
    gui.resetAddBar();
    const addBar = gui.addBar;
    assert.isNull(addBar.selected);
  });
  it("Mouse interaction", () => {
    const gui = Gui.getInstance();
    gui.mouseMoved();
    gui.mousePressed();
    gui.mouseReleased();
    gui.mouseDragged();
  });
}
