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
}
