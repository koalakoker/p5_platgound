class KeyState {
  constructor(key, metaState, altState, controlState, shiftState) {
    this.mods = new Map();
    this.mods.set(KeyState.metaKey(), metaState || false);
    this.mods.set(KeyState.altKey(), altState || false);
    this.mods.set(KeyState.controlKey(), controlState || false);
    this.mods.set(KeyState.shiftKey(), shiftState || false);
    this.key = key || "";
  }
  isEqual(key) {
    let retVal = true;
    //console.log(key.getKey(), this.getKey());
    retVal &&= key.getKey() === this.getKey();
    //console.log(retVal);
    //console.log(
    //   key.isActive(KeyState.metaKey()),
    //   this.isActive(KeyState.metaKey())
    // );
    retVal &&=
      key.isActive(KeyState.metaKey()) === this.isActive(KeyState.metaKey());
    //console.log(retVal);
    //console.log(
    //   key.isActive(KeyState.altKey()),
    //   this.isActive(KeyState.altKey())
    // );
    retVal &&=
      key.isActive(KeyState.altKey()) === this.isActive(KeyState.altKey());
    //console.log(retVal);
    //console.log(
    //   key.isActive(KeyState.controlKey()),
    //   this.isActive(KeyState.controlKey())
    // );
    retVal &&=
      key.isActive(KeyState.controlKey()) ===
      this.isActive(KeyState.controlKey());
    //console.log(retVal);
    //console.log(
    //   key.isActive(KeyState.shiftKey()),
    //   this.isActive(KeyState.shiftKey())
    // );
    retVal &&=
      key.isActive(KeyState.shiftKey()) === this.isActive(KeyState.shiftKey());
    //console.log(retVal);
    return retVal;
  }
  toString() {
    let str = "";
    if (this.isActive(KeyState.metaKey())) {
      str += "cmd+";
    }
    if (this.isActive(KeyState.altKey())) {
      str += "alt+";
    }
    if (this.isActive(KeyState.controlKey())) {
      str += "ctrl+";
    }
    if (this.isActive(KeyState.shiftKey())) {
      str += "shift+";
    }
    str += this.getKey();
    return str;
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
