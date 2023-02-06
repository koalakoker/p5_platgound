class ColoPicker extends GElem {
  constructor(color, x, y) {
    super(x, y);
    this.color = color;
    this.showPicker = false;
    this.pl = 200;
    this.ph = 200;
    this.margin = 4;
    this.debounceTimer = null;
  }
  display() {
    stroke(255);
    strokeWeight(1);
    fill(this.color);
    rect(this.x, this.y, this.size().x, this.size().y);

    if (this.showPicker) {
      rect(
        this.x - (this.pl - this.size().x) / 2,
        this.y + this.size().y + this.margin,
        this.pl,
        this.ph
      );
    }
  }
  mousePressed() {
    if (this.inside()) {
      this.showPicker = !this.showPicker;
    }
  }
  mouseMoved() {
    if (this.showPicker) {
      if (!(this.inside() || this.insidePicker())) {
        if (!this.debounceTimer) {
          this.debounceTimer = setTimeout(() => {
            this.showPicker = false;
            this.debounceTimer = null;
          }, 50);
        }
      } else {
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
          this.debounceTimer = null;
        }
      }
    }
  }
  insidePicker() {
    return (
      this.showPicker &&
      Rect.inside(
        mouseX,
        mouseY,
        this.x - (this.pl - this.size().x) / 2,
        this.y + this.size().y + this.margin,
        this.pl,
        this.ph
      )
    );
  }
}
