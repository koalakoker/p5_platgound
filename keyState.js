const metaKey = "meta";
const altKey = "alt";
const controlKey = "control";
const shiftKey = "shift";
class KeyState {
  constructor() {
    this.mods = new Map();
    this.mods.set(metaKey, false);
    this.mods.set(altKey, false);
    this.mods.set(controlKey, false);
    this.mods.set(shiftKey, false);
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
}
