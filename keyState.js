class KeyState {
  constructor() {
    this.mods = new Map();
    this.mods.set(KeyState.metaKey(), false);
    this.mods.set(KeyState.altKey(), false);
    this.mods.set(KeyState.controlKey(), false);
    this.mods.set(KeyState.shiftKey(), false);
    this.key = "";
  }
  setKey(key) {
    this.key = key;
  }
  getKey() {
    return this.key;
  }
  setModifier(modifier) {
    this.mods.set(modifier, true);
  }
  resetModifier() {
    this.mods.set(modifier, false);
  }
  isActive(modifier) {
    return this.mods.get(modifier);
  }
  static metaKey() {
    return "meta";
  }
  static altKey() {
    return "alt";
  }
  static controlKey() {
    return "control";
  }
  static shiftKey() {
    return "shift";
  }
}
