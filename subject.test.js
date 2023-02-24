let sub;

function subjectTests() {
  it("Constructor", () => {
    const name = "Test subject name";
    sub = new Subject(name);
    assert.equal(sub.name, name);
    assert.deepEqual(sub.observers, []);
  });
  it("Attach/Detach observer", () => {
    const obs1 = new Observer();
    sub.attach(obs1);
    assert.equal(sub.observers.length, 1);
    assert.equal(sub.observers[0], obs1);
    sub.attach(obs1);
    assert.equal(sub.observers.length, 1);
    assert.equal(sub.observers[0], obs1);
    const obs2 = new Observer();
    sub.attach(obs2);
    assert.equal(sub.observers.length, 2);
    assert.equal(sub.observers[1], obs2);

    sub.detach(obs1);
    assert.equal(sub.observers.length, 1);
    assert.equal(sub.observers[0], obs2);
    sub.detach(obs1);
    assert.equal(sub.observers.length, 1);
    assert.equal(sub.observers[0], obs2);
  });

  it("Notify", () => {
    return new Promise((resolve, reject) => {
      let notify = 0;
      const obsToBeNotified1 = new Observer(() => {
        notify++;
      });
      sub.attach(obsToBeNotified1);
      const obsToBeNotified2 = new Observer(() => {
        notify++;
      });
      sub.attach(obsToBeNotified2);
      sub.notify();
      assert.equal(notify, 2);
      resolve();
    });
  });
}
