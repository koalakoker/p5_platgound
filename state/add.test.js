function addTests() {
  it("Add state test", () => {
    const gui = Gui.getInstance();
    gui.init();

    const addState = new StateAdd();
    assert.isFalse(addState.dragging);

    const drw = Drawing.getInstance();
    drw.clear();

    addState.mousePressed();
    assert.isTrue(addState.dragging);
    const emptyCircle = new Circle(100, 100, 0);
    addState.newElement = emptyCircle;
    addState.mouseReleased();
    assert.deepEqual(drw.getElements(), []);

    assert.isFalse(addState.dragging);
    isTypeOf(drw.state, StateSelect);

    addState.mousePressed();
    assert.isTrue(addState.dragging);
    const notEmptyCircle = new Circle(100, 100, 10);
    addState.newElement = notEmptyCircle;
    addState.mouseReleased();
    const lastElem = drw.getElements().pop();
    assert.equal(lastElem, notEmptyCircle);
  });
}
