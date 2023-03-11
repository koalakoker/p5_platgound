function checkKeyLoggerAndShortCutOpeartions() {
  it("Check KeyLogger and ShortCut opeartions", () => {
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

      keyLogSimulatePress_shift_ctrl_z(); // Trigger
      keyLogSimulatePress_ctrl_a();
      keyLogSimulatePress_ctrl_z(); // Trigger
      keyLogSimulatePress_shift_ctrl_z(); // Trigger
      kl.detach(shortCut2);
      keyLogSimulatePress_ctrl_z(); // Trigger
      keyLogSimulatePress_shift_ctrl_z();
      kl.detach(shortCut);
      keyLogSimulatePress_ctrl_z();
      kl.attach(shortCut);
      keyLogSimulatePress_ctrl_a();
      keyLogSimulatePress_ctrl_z(); // Trigger
      keyLogSimulatePress_ctrl_z(); // Trigger
      kl.attach(shortCut2);
      keyLogSimulatePress_shift_ctrl_z(); // Trigger
      if (activations === expectedActivation) {
        resolve();
      } else {
        reject();
      }
    });
  });
}

function keyLogSimulatePress_z() {
  this.keyEventGen("keydown", new KeyState("z"));
  this.keyEventGen("keyup", new KeyState("z"));
}
function keyLogSimulatePress_ctrl_a() {
  this.keyEventGen("keydown", new KeyState("a").addCtrl());
  this.keyEventGen("keyup", new KeyState("a").addCtrl());
}
function keyLogSimulatePress_ctrl_z() {
  this.keyEventGen("keydown", new KeyState("z").addCtrl());
  this.keyEventGen("keyup", new KeyState("z").addCtrl());
}
function keyLogSimulatePress_shift_ctrl_z() {
  this.keyEventGen("keydown", new KeyState("Z").addCtrl().addShift());
  this.keyEventGen("keyup", new KeyState("Z").addCtrl().addShift());
}
function keyEventGen(type, ks) {
  var e = new KeyboardEvent(type, {
    key: ks.getKey(),
    ctrlKey: ks.isActive(KeyState.controlKey()),
    metaKey: ks.isActive(KeyState.metaKey()),
    altKey: ks.isActive(KeyState.altKey()),
    shiftKey: ks.isActive(KeyState.shiftKey()),
  });
  window.dispatchEvent(e);
}
