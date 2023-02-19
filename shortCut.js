class ShortCut extends Observer {
  constructor(activationKey, cbActivation) {
    super(cbActivation);
    this.activationKey = activationKey;
  }
  update() {
    const keyState = kl.getState();
    // console.log(keyState.toString());
    if (this.activationKey.isEqual(keyState)) {
      super.update();
    }
  }
}
