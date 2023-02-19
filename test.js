class Test {
  constructor() {}
  test1() {
    const ks = new KeyState("z", true);
    const shortCut = new ShortCut(ks, (msg) => {
      console.log(msg);
    });
    kl.attach(shortCut);
    // z
    kl.keyPressed("z");
    kl.keyReleased("z");
    // cmd+z
    kl.keyPressed("Meta");
    kl.keyPressed("z");
    kl.keyReleased("z");
    kl.keyReleased("Meta");
    // shift+cmd+z
    kl.keyPressed("Shift");
    kl.keyPressed("Meta");
    kl.keyPressed("z");
    kl.keyReleased("z");
    kl.keyReleased("Meta");
    kl.keyReleased("Shift");
    kl.detach(shortCut);
  }
  checkKeyStateIsEqual() {
    const ks1 = new KeyState("a", true, false, false, true);
    const ks2 = new KeyState("b", true, false, false, true);
    const ks3 = new KeyState("z", true);
    const ks4 = new KeyState("z", true);
    const ks5 = new KeyState("z", true, false, false, true);
    const ks6 = new KeyState("z", true, false, false, true);
    let retVal = true;
    retVal &&= this.compareKeyState(ks1, ks2) === false;
    retVal &&= this.compareKeyState(ks3, ks4) === true;
    retVal &&= this.compareKeyState(ks3, ks5) === false;
    retVal &&= this.compareKeyState(ks5, ks6) === true;
    console.log("Test " + (retVal ? "Passed" : "Not Passed"));
    return retVal;
  }
  compareKeyState(ks1, ks2) {
    return ks1.isEqual(ks2);
  }
}
