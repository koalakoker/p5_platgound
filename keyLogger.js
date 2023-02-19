class KeyLogger extends Subject {
  constructor() {
    super();
    this.keyState = new KeyState();
  }
  setState(keyState) {
    this.keyState = keyState;
    this.notify();
  }
  getState() {
    return this.keyState;
  }
  keyPressed(key) {
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
        this.setState(this.keyState);
        break;
    }
  }
  keyReleased(key) {
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
  kl.keyPressed(key);
  return false;
}

function keyReleased() {
  kl.keyReleased(key);
  return false;
}
