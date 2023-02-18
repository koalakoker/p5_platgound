class KeyLogger extends Subject {
  constructor() {
    super();
    this.keyState = new KeyState();
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
        this.keyState.setModifier("meta");
        break;
      case "Alt":
        this.keyState.setModifier("alt");
        break;
      case "Control":
        this.keyState.setModifier("control");
        break;
      case "Shift":
        this.keyState.setModifier("shift");
        break;

      default:
        this.keyState.setKey(key);
        break;
    }
    this.setState(this.keyState);
  }
  keyReleased() {
    switch (key) {
      case "Meta":
        this.keyState.resetModifier("meta");
        break;
      case "Alt":
        this.keyState.resetModifier("alt");
        break;
      case "Control":
        this.keyState.resetModifier("control");
        break;
      case "Shift":
        this.keyState.resetModifier("shift");
        break;

      default:
        this.keyState.setKey("");
        break;
    }
  }
}

kl = new KeyLogger();

function keyPressed() {
  kl.keyPressed();
}

function keyReleased() {
  kl.keyReleased();
}
