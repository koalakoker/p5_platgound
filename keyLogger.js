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
  keyPressed() {
    this.setState("key pressed: " + key);
  }
  keyReleased() {
    this.setState("Key released: " + key);
  }
}

kl = new KeyLogger();

function keyPressed() {
  kl.keyPressed();
}

function keyReleased() {
  kl.keyReleased();
}
