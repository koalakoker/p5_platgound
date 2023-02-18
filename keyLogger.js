class KeyLogger extends Subject {
  constructor() {
    super();
    this.state;
  }
  setState(state) {
    this.state = state;
    this.notify(state);
  }
  getState() {
    return this.state;
  }
}
