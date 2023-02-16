class ShortCut {
  constructor(key, modifier, secondModifier) {
    this.key = key;
    this.modifier = modifier;
    this.modifierPressed = false;
    this.secondModifier = secondModifier;
    this.secondModifierPressed = false;
  }
  keyPressed() {
    console.log(this);
    console.log(key);
    if (this.modifier) {
      if (key === this.modifier) {
        this.modifierPressed = true;
      }
    } else {
      this.modifierPressed = true;
    }
    if (this.secondModifier) {
      if (key === this.secondModifier) {
        this.secondModifierPressed = true;
      }
    } else {
      this.secondModifierPressed = true;
    }
    if (
      key === this.key &&
      this.modifierPressed &&
      this.secondModifierPressed
    ) {
      console.log(key);
      return true;
    }
    // const key = this.key ? keyIsDown(this.key) : false;
    // const modifierDown = this.modifier ? keyIsDown(this.modifier) : true;
    // const secondModifier = this.secondModifier
    //   ? keyIsDown(this.secondModifier)
    //   : true;

    return false;
  }
  keyReleased() {
    if (this.modifier) {
      if (key === this.modifier) {
        this.modifierPressed = false;
      }
    }
    if (this.secondModifier) {
      if (key === this.secondModifier) {
        this.secondModifierPressed = false;
      }
    }
  }
}
