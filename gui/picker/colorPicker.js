class ColorPicker extends Picker {
  constructor(parent, color, cbColorPicked, cbTransparentChange, x, y) {
    super(parent, x, y);
    this.color = color;
    this.transparent = false;
    this.bSlider = new Slider(
      p5js.brightness(color),
      this.size().w,
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
  }
  display() {
    p5js.stroke(255);
    p5js.strokeWeight(1);
    if (this.transparent) {
      p5js.fill(0);
    } else {
      p5js.fill(this.color);
    }
    p5js.rect(this.getX(), this.getY(), this.size().w, this.size().h);
    if (this.transparent) {
      p5js.stroke(255, 0, 0);
      p5js.strokeWeight(2);
      p5js.line(
        this.getX() + 2,
        this.getY() + 2,
        this.getX() + this.size().w - 2,
        this.getY() + this.size().h - 2
      );
    }

    if (this.selected) {
      this.bSlider.display(this.basePoint().x + this.side, this.basePoint().y);

      p5js.colorMode(p5js.HSB, this.side);
      for (let h = 0; h < this.side; h++) {
        for (let s = 0; s < this.side; s++) {
          p5js.stroke(h, s, this.bValue);
          p5js.strokeWeight(2);
          p5js.point(this.basePoint().x + h, this.basePoint().y + s);
        }
      }
      p5js.colorMode(p5js.RGB);
      p5js.stroke(255);
      p5js.strokeWeight(1);
      p5js.noFill();
      p5js.rect(this.basePoint().x, this.basePoint().y, this.side, this.side);

      this.cTransparent.display(
        this.basePoint().x - this.size().w,
        this.basePoint().y,
        this.size().w,
        this.size().h
      );
    }
  }
  mousePressed() {
    if (super.mousePressed()) {
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
  inside() {
    return (
      super.inside() ||
      this.insidePicker() ||
      this.insideSlider() ||
      this.insideCheck()
    );
  }
  insidePicker() {
    return Rect.inside(
      p5js.mouseX,
      p5js.mouseY,
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
