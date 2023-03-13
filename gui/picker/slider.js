class Slider {
  constructor(value, w, maxValue, cbValueChanged) {
    this.x = 0;
    this.y = 0;
    this.w = w;
    this.maxValue = maxValue;
    this.setValue(value);
    this.cursorFill = 255;
    this.cbValueChanged = cbValueChanged;
    this.dragged = false;
  }
  setValue(value) {
    this.value_ = p5js.constrain(value, 0, this.maxValue);
    if (this.cbValueChanged) {
      this.cbValueChanged(this.value_);
    }
  }
  value() {
    return this.value_;
  }
  display(x, y) {
    this.x = x;
    this.y = y;
    p5js.fill(0);
    p5js.stroke(255);
    p5js.strokeWeight(1);
    p5js.rect(x, y, this.w, this.maxValue);
    p5js.noStroke();
    p5js.fill(this.cursorFill);
    const dividers = 10;
    this.cH = this.maxValue / dividers;
    this.cY = this.y + this.value_ - this.cH / 2;
    p5js.rect(this.x, this.cY, this.w, this.cH);
  }
  inside(x, y) {
    return this.dragged
      ? true
      : Rect.inside(x, y, this.x, this.y, this.w, this.maxValue);
  }
  onCursor(x, y) {
    return Rect.inside(x, y, this.x, this.cY, this.x, this.cH);
  }
  mouseDragged(x, y) {
    this.setValue(y - this.y);
  }
  mousePressed(x, y) {
    this.cursorFill = p5js.color(255, 255, 0);
    this.dragged = true;
    this.setValue(y - this.y);
  }
  mouseReleased(x, y) {
    this.dragged = false;
  }
}
