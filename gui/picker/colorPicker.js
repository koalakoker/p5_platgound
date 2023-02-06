class ColoPicker extends GElem {
  constructor(color, x, y) {
    super(x, y);
    this.color = color;
    this.showPicker = false;
    this.side = 100;
    this.margin = 4;
    this.debounceTimer = null;
    this.bSlider = new Slider(this.size().x, this.side);
  }
  display() {
    stroke(255);
    strokeWeight(1);
    fill(this.color);
    rect(this.x, this.y, this.size().x, this.size().y);

    if (this.showPicker) {
      noFill();
      rect(this.basePoint().x, this.basePoint().y, this.side, this.side);
      this.bSlider.display(this.basePoint().x + this.side, this.basePoint().y);

      colorMode(HSB, this.side);
      for (let h = 0; h < this.side; h++) {
        for (let s = 0; s < this.side; s++) {
          stroke(h, s, 100);
          point(this.basePoint().x + h, this.basePoint().y + s);
        }
      }
      colorMode(RGB);
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
      this.bSlider.mouseMoved();
    }
  }
  basePoint() {
    const bx = this.x - (this.side - this.size().x) / 2;
    const by = this.y + this.size().y + this.margin;
    return { x: bx, y: by };
  }
  insidePicker() {
    return (
      this.showPicker &&
      (Rect.inside(
        mouseX,
        mouseY,
        this.basePoint().x,
        this.basePoint().y,
        this.side,
        this.side
      ) ||
        this.bSlider.inside())
    );
  }
}
