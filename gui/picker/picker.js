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

      // If picker is selected lock main bar
      const gui = Gui.getInstance();
      if (this.selected) {
        gui.mainBar.lock();
      }
      return true;
    }
    return false;
  }
  mouseMoved(x, y, test_ms) {
    if (this.selected) {
      if (!this.inside(x, y)) {
        // Ouside the sensitive area -> hide picker
        if (!this.debounceTimer) {
          return new Promise((resolve) => {
            this.debounceTimer = setTimeout(() => {
              this.selected = false;
              this.debounceTimer = null;
              resolve();
            }, test_ms || this.fadeOutTimeMs);
          });
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
