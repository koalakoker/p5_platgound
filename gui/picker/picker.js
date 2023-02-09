class Picker extends GElem {
  constructor(x, y) {
    super(x, y);

    this.selected = false;
    this.side = 100;
    this.margin = 4;
    this.debounceTimer = null;
    this.fadeOutTimeMs = 1000;
  }
  display() {}
  mousePressed() {
    if (super.inside()) {
      this.selected = !this.selected;
      return true;
    }
  }
  mouseMoved() {
    if (this.selected) {
      if (!this.inside()) {
        // Ouside the sensitive area -> hide picker
        if (!this.debounceTimer) {
          this.debounceTimer = setTimeout(() => {
            this.selected = false;
            this.debounceTimer = null;
          }, this.fadeOutTimeMs);
        }
      } else {
        // Inside one of the sensitive area
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
          this.debounceTimer = null;
        }
      }
    }
  }
  keyPressed() {
    if (keyCode === ESCAPE) {
      this.selected = false;
      this.debounceTimer = null;
    }
  }
  basePoint() {
    const bx = this.x - (this.side - this.size().x) / 2;
    const by = this.y + this.size().y + this.margin;
    return { x: bx, y: by };
  }
}
