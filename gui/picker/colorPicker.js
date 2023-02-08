class ColorPicker extends GElem {
  constructor(color, cbColorPicked, cbTransparentChange, x, y) {
    super(x, y);
    this.color = color;
    this.transparent = false;
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
    this.cTransparent = new TransparentCheck(this.transparent, (state) => {
      this.transparent = state;
      if (this.cbTransparentChange) {
        this.cbTransparentChange(state);
      }
    });
    this.bValue = this.bSlider.value;
    this.cbColorPicked = cbColorPicked;
    this.cbTransparentChange = cbTransparentChange;
    this.fadeOutTimeMs = 1000;
  }
  display() {
    stroke(255);
    strokeWeight(1);
    if (this.transparent) {
      fill(0);
    } else {
      fill(this.color);
    }
    rect(this.x, this.y, this.size().x, this.size().y);
    if (this.transparent) {
      stroke(255, 0, 0);
      strokeWeight(2);
      line(
        this.x + 2,
        this.y + 2,
        this.x + this.size().x - 2,
        this.y + this.size().y - 2
      );
    }

    if (this.selected) {
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
      stroke(255);
      strokeWeight(1);
      noFill();
      rect(this.basePoint().x, this.basePoint().y, this.side, this.side);

      this.cTransparent.display(
        this.basePoint().x - this.size().x,
        this.basePoint().y,
        this.size().x,
        this.size().y
      );
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
    if (this.insideCheck()) {
      this.cTransparent.mousePressed();
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
      this.transparent = false;
      this.cTransparent.selected = false;
      if (this.cbTransparentChange) {
        this.cbTransparentChange(false);
      }
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
      if (
        !(
          this.inside() ||
          this.insidePicker() ||
          this.insideSlider() ||
          this.insideCheck()
        )
      ) {
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
  insideCheck() {
    return this.cTransparent.inside();
  }
}
