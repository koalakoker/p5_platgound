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
        this.keyState.setModifier(KeyState.metaKey());
        break;
      case "Alt":
        this.keyState.setModifier(KeyState.altKey());
        break;
      case "Control":
        this.keyState.setModifier(KeyState.controlKey());
        break;
      case "Shift":
        this.keyState.setModifier(KeyState.shiftKey());
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
        this.keyState.resetModifier(KeyState.metaKey());
        break;
      case "Alt":
        this.keyState.resetModifier(KeyState.altKey());
        break;
      case "Control":
        this.keyState.resetModifier(KeyState.controlKey());
        break;
      case "Shift":
        this.keyState.resetModifier(KeyState.shiftKey());
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
