function compareKeyState(ks1, ks2) {
  return ks1.isEqual(ks2);
}

function checkKeyStateIsEqualMethod() {
  it("Check KeyState isEqual method", () => {
    const ks1 = new KeyState("a").addMeta().addShift();
    const ks2 = new KeyState("b").addMeta().addShift();
    const ks3 = new KeyState("z").addMeta();
    const ks4 = new KeyState("z").addMeta();
    const ks5 = new KeyState("z").addMeta().addShift();
    const ks6 = new KeyState("z").addMeta().addShift();
    let retVal = true;
    retVal &&= compareKeyState(ks1, ks2) === false;
    retVal &&= compareKeyState(ks3, ks4) === true;
    retVal &&= compareKeyState(ks3, ks5) === false;
    retVal &&= compareKeyState(ks5, ks6) === true;
    assert.equal(retVal, true);
  });
}
