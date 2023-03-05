function guiTests() {
  it("Instancng", () => {
    const gui = Gui.getInstance();
    assert.isTrue(isTypeOf(gui, Gui));
    gui.preload();
    assert.isTrue(isTypeOf(gui.mainBar, DropDownBar));
  });
  it("Setup", () => {
    const gui = Gui.getInstance();
    //gui.setup();
  });
  // it("Dialog", () => {
  //   const gui = Gui.getInstance();
  //   gui.addMessage("Test");
  //   //console.log(gui.dialogs);
  // });
}
