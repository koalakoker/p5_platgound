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
  filterModifierKey(eventKey) {
    switch (eventKey) {
      case "Meta":
        return "";
      case "Alt":
        return "";
      case "Control":
        return "";
      case "Shift":
        return "";
      default:
        return eventKey;
    }
  }
}

kl = new KeyLogger();
window.addEventListener("keydown", (event) => {
  const kf = kl.filterModifierKey(event.key);
  const ks = new KeyState(kf)
    .addMeta(event.metaKey)
    .addAlt(event.altKey)
    .addCtrl(event.ctrlKey)
    .addShift(event.shiftKey);
  kl.setState(ks);
  event.preventDefault();
});
window.addEventListener("keyup", (event) => {
  kl.setState(
    new KeyState("", event.metaKey, event.altKey, event.ctrlKey, event.shiftKey)
  );
});
