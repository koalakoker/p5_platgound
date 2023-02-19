class KeyState {
  constructor(key, metaState, altState, controlState, shiftState) {
    this.mods = new Map();
    this.mods.set(KeyState.metaKey(), metaState);
    this.mods.set(KeyState.altKey(), altState);
    this.mods.set(KeyState.controlKey(), controlState);
    this.mods.set(KeyState.shiftKey(), shiftState);
    this.key = key;
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
  resetModifier(modifier) {
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
