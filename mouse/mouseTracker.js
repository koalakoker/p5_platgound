class MouseTracker extends Observer {
  constructor(type, cbActivation) {
    super(cbActivation);
    this.type = type;
    ml.attach(this);
  }
  update(msg) {
    const mouseState = ml.getState();
    //console.log(mouseState);
    if (this.type === mouseState.type) {
      super.update(msg);
    }
  }
}
