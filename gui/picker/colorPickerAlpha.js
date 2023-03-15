class ColorPickerAlpha extends Picker {
  constructor(parent, color, cbColorChanged, x, y) {
    super(parent, x, y);
    this.color_ = color;
    this.cbColorChanged = cbColorChanged;
    this.initSliders(color);
  }
  setColor(color, cbExec) {
    this.color_ = color;
    if (cbExec === undefined) {
      cbExec = true;
    }
    if (this.cbColorChanged === undefined) {
      this.cbColorChanged = false;
    }
    if (this.cbColorChanged && cbExec) {
      this.cbColorChanged(this.color_);
    }
    this.setSliders(color, false);
  }
  color() {
    return this.color_;
  }
  initSliders(color) {
    this.rSlider = new Slider(
      this.color2Percentage(p5js.red(color)),
      this.size().w,
      this.side,
      (percentage) => {
        const color = this.color();
        color.setRed(this.percentage2Color(percentage));
        this.setColor(color);
      }
    );
    this.gSlider = new Slider(
      this.color2Percentage(p5js.green(color)),
      this.size().w,
      this.side,
      (percentage) => {
        const color = this.color();
        color.setGreen(this.percentage2Color(percentage));
        this.setColor(color);
      }
    );
    this.bSlider = new Slider(
      this.color2Percentage(p5js.blue(color)),
      this.size().w,
      this.side,
      (percentage) => {
        const color = this.color();
        color.setBlue(this.percentage2Color(percentage));
        this.setColor(color);
      }
    );
    this.aSlider = new Slider(
      this.color2Percentage(p5js.alpha(color)),
      this.size().w,
      this.side,
      (percentage) => {
        const color = this.color();
        color.setAlpha(this.percentage2Color(percentage));
        this.setColor(color);
      }
    );
  }
  setSliders(color, cbExec) {
    this.rSlider.setColor(p5js.red(color), cbExec);
    this.gSlider.setColor(p5js.green(color), cbExec);
    this.bSlider.setColor(p5js.blue(color), cbExec);
    this.aSlider.setColor(p5js.alpha(color), cbExec);
  }
  percentage2Color(percentage) {
    return (percentage * 255) / 100;
  }
  color2Percentage(color) {
    return (color * 100) / 255;
  }
  display() {
    this.displayCheckBox();

    if (this.selected) {
      this.displayColor();
      this.displaySliders();
    }
  }
  displayCheckBox() {
    p5js.stroke(255);
    p5js.strokeWeight(1);
    p5js.fill(this.color());
    p5js.rect(this.getX(), this.getY(), this.size().w, this.size().h);
  }
  displayColor() {
    p5js.stroke(255);
    p5js.strokeWeight(1);
    p5js.fill(this.color());
    p5js.rect(this.basePoint().x, this.basePoint().y, this.side, this.side);
  }
  displaySliders() {
    this.bSlider.display(this.basePoint().x + this.side, this.basePoint().y);
  }
  mousePressed(x, y) {
    if (super.mousePressed(x, y)) {
      return true;
    }
    if (this.insideSlider(x, y)) {
      this.bSlider.mousePressed(x, y);
      return true;
    }
    if (this.insidePicker(x, y) && this.selected) {
      const h = x - this.basePoint().x;
      const s = y - this.basePoint().y;
      const b = this.bSlider.percentage_;
      console.log(h, s, b);
      p5js.colorMode(p5js.HSB, this.side);
      this.color = p5js.color(h, s, b);
      if (this.cbColorPicked) {
        this.cbColorPicked(this.color);
      }
      p5js.colorMode(p5js.RGB);
      this.transparent = false;
      this.cTransparent.selected = false;
      if (this.cbTransparentChange) {
        this.cbTransparentChange(false);
      }
      return true;
    }
    return false;
  }
  mouseReleased(x, y) {
    this.bSlider.mouseReleased(x, y);
  }
  mouseDragged(x, y) {
    if (this.insideSlider(x, y)) {
      this.bSlider.mouseDragged(x, y);
    }
  }
  inside(x, y) {
    return (
      super.inside(x, y) || this.insidePicker(x, y) || this.insideSlider(x, y)
    );
  }
  insidePicker(x, y) {
    return Rect.inside(
      x,
      y,
      this.basePoint().x,
      this.basePoint().y,
      this.side,
      this.side
    );
  }
  insideSlider(x, y) {
    return this.bSlider.inside(x, y);
  }
}
