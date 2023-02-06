class ColorPicker extends GElem {
  constructor(color, cbColorPicked, x, y) {
    super(x, y);
    this.color = color;
    this.selected = false;
    this.side = 100;
    this.margin = 4;
    this.debounceTimer = null;
    this.bSlider = new Slider(
      brightness(color),
      this.size().x,
      this.side,
      (val) => {
        this.bValue = val;
      }
    );
    this.bValue = this.bSlider.value;
    this.cbColorPicked = cbColorPicked;
    this.fadeOutTimeMs = 1000;
  }
  display() {
    stroke(255);
    strokeWeight(1);
    fill(this.color);
    rect(this.x, this.y, this.size().x, this.size().y);

    if (this.selected) {
      noFill();
      rect(this.basePoint().x, this.basePoint().y, this.side, this.side);
      this.bSlider.display(this.basePoint().x + this.side, this.basePoint().y);

      colorMode(HSB, this.side);
      for (let h = 0; h < this.side; h++) {
        for (let s = 0; s < this.side; s++) {
          stroke(h, s, this.bValue);
          strokeWeight(2);
          point(this.basePoint().x + h, this.basePoint().y + s);
        }
      }
      colorMode(RGB);
    }
  }
  mousePressed() {
    if (this.inside()) {
      this.selected = !this.selected;
      return true;
    }
    if (this.insideSlider()) {
      this.bSlider.mousePressed();
      return true;
    }
    if (this.insidePicker() && this.selected) {
      const h = mouseX - this.basePoint().x;
      const s = mouseY - this.basePoint().y;
      const b = this.bSlider.value;
      colorMode(HSB, this.side);
      this.color = color(h, s, b);
      if (this.cbColorPicked) {
        this.cbColorPicked(this.color);
      }
      colorMode(RGB);
      return true;
    }
    return false;
  }
  mouseReleased() {
    this.bSlider.mouseReleased();
  }
  mouseDragged() {
    if (this.insideSlider()) {
      this.bSlider.mouseDragged();
    }
  }
  mouseMoved() {
    if (this.selected) {
      if (!(this.inside() || this.insidePicker() || this.insideSlider())) {
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
    const bx = this.x - (this.side - this.size().x) / 2;
    const by = this.y + this.size().y + this.margin;
    return { x: bx, y: by };
  }
  insidePicker() {
    return Rect.inside(
      mouseX,
      mouseY,
      this.basePoint().x,
      this.basePoint().y,
      this.side,
      this.side
    );
  }
  insideSlider() {
    return this.bSlider.inside();
  }
}
