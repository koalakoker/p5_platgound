class KeyLogger extends Subject {
  constructor() {
    super();
    this.state;
    this.meta = false;
    this.alt = false;
    this.control = false;
    this.shift = false;
    this.key = "";
  }
  setState(state) {
    this.state = state;
    this.notify(state);
  }
  getState() {
    return this.state;
  }
  keyPressed() {
    switch (key) {
      case "Meta":
        this.meta = true;
        break;
      case "Alt":
        this.alt = true;
        break;
      case "Control":
        this.control = true;
        break;
      case "Shift":
        this.shift = true;
        break;

      default:
        this.key = key;
        this.setState("key pressed: " + this.stateString());
        break;
    }
  }
  keyReleased() {
    switch (key) {
      case "Meta":
        this.meta = false;
        break;
      case "Alt":
        this.alt = false;
        break;
      case "Control":
        this.control = false;
        break;
      case "Shift":
        this.shift = false;
        break;

      default:
        this.key = key;
        this.setState("Key released: " + this.stateString());
        break;
    }
  }
  stateString() {
    let str = "";
    if (this.meta) {
      str += "cmd+";
    }
    if (this.alt) {
      str += "alt+";
    }
    if (this.control) {
      str += "ctrl+";
    }
    if (this.shift) {
      str += "shift+";
    }
    str += this.key;
    return str;
  }
}

kl = new KeyLogger();

function keyPressed() {
  kl.keyPressed();
}

function keyReleased() {
  kl.keyReleased();
}
