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
      this.color2Percentage(p5js.red(color)),
      this.size().w,
      this.side,
      (val) => {
        const color = this.slidersColor();
        color.setRed(this.percentage2Color(val));
        this.setColor(color);
      }
    );
    this.gSlider = new Slider(
      this.color2Percentage(p5js.green(color)),
      this.size().w,
      this.side,
      (val) => {
        const color = this.slidersColor();
        color.setGreen(this.percentage2Color(val));
        this.setColor(color);
      }
    );
    this.bSlider = new Slider(
      this.color2Percentage(p5js.blue(color)),
      this.size().w,
      this.side,
      (val) => {
        const color = this.slidersColor();
        color.setBlue(this.percentage2Color(val));
        this.setColor(color);
      }
    );
    this.aSlider = new Slider(
      this.color2Percentage(p5js.alpha(color)),
      this.size().w,
      this.side,
      (val) => {
        const color = this.slidersColor();
        color.setAlpha(this.percentage2Color(val));
        this.setColor(color);
      }
    );
  }
  setSliders(color) {
    this.rSlider.setPercentage(this.color2Percentage(p5js.red(color)));
    this.gSlider.setPercentage(this.color2Percentage(p5js.green(color)));
    this.bSlider.setPercentage(this.color2Percentage(p5js.blue(color)));
    this.aSlider.setPercentage(this.color2Percentage(p5js.alpha(color)));
  }
  slidersColor() {
    const newColor = p5js.color(0, 0, 0, 0);
    newColor.setRed(this.percentage2Color(this.rSlider.percentage()));
    newColor.setGreen(this.percentage2Color(this.gSlider.percentage()));
    newColor.setBlue(this.percentage2Color(this.bSlider.percentage()));
    newColor.setAlpha(this.percentage2Color(this.aSlider.percentage()));
    return newColor;
  }
  percentage2Color(percentage) {
    return (percentage * 255) / 100;
  }
  color2Percentage(color) {
    return (color * 100) / 255;
  }
}
