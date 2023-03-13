class ColorPickerAlpha extends Picker {
  constructor(parent, color, cbColorChanged, x, y) {
    super(parent, x, y);
    this.color_ = color;
    this.cbColorChanged = cbColorChanged;
    this.initSliders(color);
  }
  setColor(color, cbStop) {
    this.color_ = color;
    if (this.cbColorChanged && !cbStop) {
      this.cbColorChanged(this.color_);
    }
  }
  color() {
    return this.color_;
  }
  initSliders(color) {
    this.rSlider = new Slider(
      p5js.red(color),
      this.size().w,
      this.side,
      (val) => {
        const color = this.slidersColor();
        color.setRed(val);
        this.setColor(color);
      }
    );
    this.gSlider = new Slider(
      p5js.green(color),
      this.size().w,
      this.side,
      (val) => {
        const color = this.slidersColor();
        color.setGreen(val);
        this.setColor(color);
      }
    );
    this.bSlider = new Slider(
      p5js.blue(color),
      this.size().w,
      this.side,
      (val) => {
        const color = this.slidersColor();
        color.setBlue(val);
        this.setColor(color);
      }
    );
  }
  setSliders(color) {
    this.rSlider.setValue(red(color));
    this.gSlider.setValue(green(color));
    this.bSlider.setValue(blue(color));
  }
  slidersColor() {
    const color = color();
    color.setRed(this.rSlider.value_);
    color.setGreen(this.gSlider.value_);
    color.setBlue(this.bSlider.value_);
    return color;
  }
}
