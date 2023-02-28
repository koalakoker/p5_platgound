function addTests() {
  it("Add state test", () => {
    const addState = new StateAdd();
    assert.isFalse(addState.dragging);
    addState.mousePressed();
    assert.isTrue(addState.dragging);
  });
}
