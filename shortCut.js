class ShortCut extends Observer {
  constructor(activationKey, cbActivation) {
    super(cbActivation);
    this.activationKey = activationKey;
  }
  update() {
    const keyState = kl.getState();
    if (this.activationKey.isEqual(keyState)) {
      super.update();
    }
  }
}
