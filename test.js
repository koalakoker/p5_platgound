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
      const expectedActivation = 7;

      const shortCut = new ShortCut(
        new KeyState("z", false, false, true, false),
        (k) => {
          if (k.isEqual(shortCut.activationKey)) {
            activations++;
          }
        }
      );
      const shortCut2 = new ShortCut(
        new KeyState("Z", false, false, true, true),
        (k) => {
          if (k.isEqual(shortCut2.activationKey)) {
            activations++;
          }
        }
      );

      this.keyLogSimulatePress_shift_ctrl_z(); // Trigger
      this.keyLogSimulatePress_z();
      this.keyLogSimulatePress_ctrl_z(); // Trigger
      this.keyLogSimulatePress_shift_ctrl_z(); // Trigger
      kl.detach(shortCut2);
      this.keyLogSimulatePress_ctrl_z(); // Trigger
      this.keyLogSimulatePress_shift_ctrl_z();
      kl.detach(shortCut);
      this.keyLogSimulatePress_ctrl_z();
      kl.attach(shortCut);
      this.keyLogSimulatePress_ctrl_a();
      this.keyLogSimulatePress_ctrl_z(); // Trigger
      this.keyLogSimulatePress_ctrl_z(); // Trigger
      kl.attach(shortCut2);
      this.keyLogSimulatePress_shift_ctrl_z(); // Trigger
      if (activations === expectedActivation) {
        resolve();
      } else {
        reject();
      }
    });
  }
  keyLogSimulatePress_z() {
    kl.keyPressed("z");
    kl.keyReleased("z");
  }
  keyLogSimulatePress_ctrl_a() {
    kl.keyPressed("Control");
    kl.keyPressed("a");
    kl.keyReleased("a");
    kl.keyReleased("Control");
  }
  keyLogSimulatePress_ctrl_z() {
    kl.keyPressed("Control");
    kl.keyPressed("z");
    kl.keyReleased("z");
    kl.keyReleased("Control");
  }
  keyLogSimulatePress_shift_ctrl_z() {
    kl.keyPressed("Shift");
    kl.keyPressed("Control");
    kl.keyPressed("Z");
    kl.keyReleased("Z");
    kl.keyReleased("Control");
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
