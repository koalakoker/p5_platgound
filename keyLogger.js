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
        this.keyState.setModifier(metaKey);
        break;
      case "Alt":
        this.keyState.setModifier(altKey);
        break;
      case "Control":
        this.keyState.setModifier(controlKey);
        break;
      case "Shift":
        this.keyState.setModifier(shiftKey);
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
        this.keyState.resetModifier(metaKey);
        break;
      case "Alt":
        this.keyState.resetModifier(altKey);
        break;
      case "Control":
        this.keyState.resetModifier(controlKey);
        break;
      case "Shift":
        this.keyState.resetModifier(shiftKey);
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
