function hintsTests() {
  it("Hints tests", () => {
    const hints = new Hints();
    assert.isArray(hints.messages);
    const gui = Gui.getInstance();
    //console.log(gui);
  });
}
