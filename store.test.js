function storeTests() {
  it("Store tests", () => {
    const store = Store.getInstance();
    store.clear();
    assert.equal(store.currentIndex, -1);
    assert.deepEqual(store.history, []);

    const drw = Drawing.getInstance();
    drw.clear();

    const state1 = drw.serialize();
    store.addState();
    assert.equal(store.currentIndex, 0);
    assert.notDeepEqual(store.history, []);
    assert.deepEqual(store.history[0], state1);

    drw.addNewElement(new Circle(100, 100, 100));
    const state2 = drw.serialize();
    store.addState();
    console.log();
    assert.deepEqual(store.history[1], state2);

    assert.equal(drw.serialize(), state2);
    store.moveToNextState();
    assert.equal(drw.serialize(), state2);
    store.moveToPreviousState();
    assert.equal(drw.serialize(), state1);
    store.moveToPreviousState();
    assert.equal(drw.serialize(), state1);
  });
}
