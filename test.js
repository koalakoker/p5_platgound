class Test {
  constructor() {
    this.separator();
    this.checkKeyStateIsEqual();
    this.separator();
    this.checkKeyLoggerAndShortCut()
      .then(() => {
        console.log("Test Passed");
      })
      .catch(() => {
        console.log("Test Rejected");
      });
  }

  checkKeyLoggerAndShortCut() {
    console.log("checkKeyLoggerAndShortCut");
    return new Promise((resolve, reject) => {
      let activations = 0;
      const ks = new KeyState("z", true);
      const shortCut = new ShortCut(ks, () => {
        activations++;
        if (activations === 4) {
          resolve();
        }
      });
      this.keyLogSimulatePress_cmd_z();
      kl.attach(shortCut);
      this.keyLogSimulatePress_shift_cmd_z();
      this.keyLogSimulatePress_z();
      this.keyLogSimulatePress_cmd_z(); // Trigger
      this.keyLogSimulatePress_shift_cmd_z();
      this.keyLogSimulatePress_cmd_z(); // Trigger
      kl.detach(shortCut);
      this.keyLogSimulatePress_cmd_z();
      kl.attach(shortCut);
      this.keyLogSimulatePress_cmd_a();
      this.keyLogSimulatePress_cmd_z(); // Trigger
      this.keyLogSimulatePress_cmd_z(); // Trigger
      reject();
    });
  }
  keyLogSimulatePress_z() {
    kl.keyPressed("z");
    kl.keyReleased("z");
  }
  keyLogSimulatePress_cmd_a() {
    kl.keyPressed("Meta");
    kl.keyPressed("a");
    kl.keyReleased("a");
    kl.keyReleased("Meta");
  }
  keyLogSimulatePress_cmd_z() {
    kl.keyPressed("Meta");
    kl.keyPressed("z");
    kl.keyReleased("z");
    kl.keyReleased("Meta");
  }
  keyLogSimulatePress_shift_cmd_z() {
    kl.keyPressed("Shift");
    kl.keyPressed("Meta");
    kl.keyPressed("z");
    kl.keyReleased("z");
    kl.keyReleased("Meta");
    kl.keyReleased("Shift");
  }

  checkKeyStateIsEqual() {
    console.log("checkKeyStateIsEqual");
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

  separator() {
    console.log("============================================================");
  }
}
