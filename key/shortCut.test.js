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
