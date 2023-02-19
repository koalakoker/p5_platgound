class ShortCut extends Observer {
  constructor(activationKey, cbUpdate) {
    super(cbUpdate);
    this.activationKey = activationKey;
  }
  update() {
    const keyState = kl.getState();
    if (keyState === this.activationKey) {
      super.update(KeyLogger.toString(keyState));
    }
  }
}
