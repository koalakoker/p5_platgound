function keyLoggerTest() {
  const kl = new KeyLogger();
  const ks1 = new KeyState("z");
  const ks2 = new KeyState("a").addAlt().addShift();

  it("Set/Get state", () => {
    kl.setState(ks1);
    assert.isTrue(kl.getState().isEqual(ks1));
    kl.setState(ks2);
    assert.isFalse(kl.getState().isEqual(ks1));
    assert.isTrue(kl.getState().isEqual(ks2));
  });
  it("filterModifierKey", () => {
    const fk = KeyLogger.filterModifierKey(ks1.getKey());
    assert.equal(fk, "z");
  });
}
