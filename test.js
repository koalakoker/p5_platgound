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

      const shortCut = new ShortCut(new KeyState("z").addCtrl(), (k) => {
        if (k.isEqual(shortCut.activationKey)) {
          activations++;
        }
      });
      const shortCut2 = new ShortCut(
        new KeyState("Z").addCtrl().addShift(),
        (k) => {
          if (k.isEqual(shortCut2.activationKey)) {
            activations++;
          }
        }
      );

      this.keyLogSimulatePress_shift_ctrl_z(); // Trigger
      this.keyLogSimulatePress_ctrl_a();
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
    this.keyEventGen("keydown", new KeyState("z"));
    this.keyEventGen("keyup", new KeyState("z"));
  }
  keyLogSimulatePress_ctrl_a() {
    this.keyEventGen("keydown", new KeyState("a").addCtrl());
    this.keyEventGen("keyup", new KeyState("a").addCtrl());
  }
  keyLogSimulatePress_ctrl_z() {
    this.keyEventGen("keydown", new KeyState("z").addCtrl());
    this.keyEventGen("keyup", new KeyState("z").addCtrl());
  }
  keyLogSimulatePress_shift_ctrl_z() {
    this.keyEventGen("keydown", new KeyState("Z").addCtrl().addShift());
    this.keyEventGen("keyup", new KeyState("Z").addCtrl().addShift());
  }
  keyEventGen(type, ks) {
    var e = new KeyboardEvent(type, {
      key: ks.getKey(),
      ctrlKey: ks.isActive(KeyState.controlKey()),
      metaKey: ks.isActive(KeyState.metaKey()),
      altKey: ks.isActive(KeyState.altKey()),
      shiftKey: ks.isActive(KeyState.shiftKey()),
    });
    window.dispatchEvent(e);
  }

  checkKeyStateIsEqual() {
    console.log("checkKeyStateIsEqual");
    const ks1 = new KeyState("a").addMeta().addShift();
    const ks2 = new KeyState("b").addMeta().addShift();
    const ks3 = new KeyState("z").addMeta();
    const ks4 = new KeyState("z").addMeta();
    const ks5 = new KeyState("z").addMeta().addShift();
    const ks6 = new KeyState("z").addMeta().addShift();
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
