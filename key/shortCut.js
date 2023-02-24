class ShortCut extends Observer {
  constructor(activationKey, cbActivation) {
    super(cbActivation);
    this.activationKey = activationKey;
    kl.attach(this);
  }
  update() {
    const keyState = kl.getState();
    // console.log(keyState.toString());
    if (this.activationKey.isEqual(keyState)) {
      super.update(keyState);
    }
  }
}
