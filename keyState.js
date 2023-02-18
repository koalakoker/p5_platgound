class KeyState {
  constructor() {
    this.meta = false;
    this.alt = false;
    this.control = false;
    this.shift = false;
    this.key = "";
  }
  setKey(key) {
    this.key = key;
  }
  getKey() {
    return this.key;
  }
  setModifier(modifier) {
    switch (modifier) {
      case "meta":
        this.meta = true;
        break;
      case "alt":
        this.alt = true;
        break;
      case "control":
        this.control = true;
        break;
      case "shift":
        this.shift = true;
        break;
      default:
        break;
    }
  }
  resetModifier() {
    switch (modifier) {
      case "meta":
        this.meta = false;
        break;
      case "alt":
        this.alt = false;
        break;
      case "control":
        this.control = false;
        break;
      case "shift":
        this.shift = false;
        break;
      default:
        break;
    }
  }
  isActive(modifier) {
    switch (modifier) {
      case "meta":
        return this.meta;
      case "alt":
        return this.alt;
      case "control":
        return this.control;
      case "shift":
        return this.shift;
      default:
        return false;
    }
  }
}
