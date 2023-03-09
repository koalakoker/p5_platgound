class Picker extends GElem {
  constructor(parent, x, y) {
    super(parent, x, y);

    this.selected = false;
    this.side = 100;
    this.margin = 4;
    this.debounceTimer = null;
    this.fadeOutTimeMs = 1000;
  }
  display() {}
  mousePressed(x, y) {
    if (super.inside(x, y)) {
      this.selected = !this.selected;
      // If picker is selected lock main bar else unlock
      const gui = Gui.getInstance();
      if (this.selected) {
        gui.mainBar.lock = true;
      } else {
        gui.mainBar.lock = false;
      }
      return true;
    }
    return false;
  }
  mouseMoved(x, y) {
    if (this.selected) {
      if (!this.inside(x, y)) {
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
  basePoint() {
    const bx = this.getX() - (this.side - this.size().w) / 2;
    const by = this.getY() + this.size().w + this.margin;
    return { x: bx, y: by };
  }
}
