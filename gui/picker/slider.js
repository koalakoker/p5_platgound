class Slider {
  constructor(displayColor, percentage, w, h, cbValueChanged) {
    this.displayColor = displayColor;
    this.x = 0;
    this.y = 0;
    this.w = w;
    this.h = h;
    this.setPercentage(percentage);
    this.cursorFill = 255;
    this.cbValueChanged = cbValueChanged;
    this.dragged = false;
  }
  setPercentage(percentage, cbExec) {
    this.percentage_ = p5js.constrain(percentage, 0, 100);
    if (cbExec === undefined) {
      cbExec = true;
    }
    if (this.cbValueChanged && cbExec) {
      this.cbValueChanged(this.percentage_);
    }
  }
  setColor(color, cbExec) {
    color = p5js.constrain(color, 0, 255);
    this.setPercentage((color * 100) / 255, cbExec);
  }
  color() {
    return (this.percentage() * 255) / 100;
  }
  percentage() {
    return this.percentage_;
  }
  display(x, y) {
    this.x = x;
    this.y = y;
    this.displayBackgroundRect();
    this.displayCursor();
  }
  displayBackgroundRect() {
    p5js.fill(this.displayColor);
    p5js.stroke(255);
    p5js.strokeWeight(1);
    p5js.rect(this.x, this.y, this.w, this.h);
  }
  displayCursor() {
    p5js.noStroke();
    p5js.fill(this.cursorFill);
    const dividers = 10;
    this.cH = this.h / dividers;
    const value = (this.percentage_ * this.h) / 100;
    this.cY = this.y + this.h - value - this.cH / 2;
    p5js.rect(this.x, this.cY, this.w, this.cH);
  }
  inside(x, y) {
    return this.dragged
      ? true
      : Rect.inside(x, y, this.x, this.y, this.w, this.h);
  }
  onCursor(x, y) {
    return Rect.inside(x, y, this.x, this.cY, this.x, this.cH);
  }
  mouseDragged(x, y) {
    this.setPercentage(100 * ((this.y + this.h - y) / this.h));
  }
  mousePressed(x, y) {
    this.cursorFill = p5js.color(255, 255, 0);
    this.dragged = true;
    this.setPercentage(100 * ((this.y + this.h - y) / this.h));
  }
  mouseReleased(x, y) {
    this.dragged = false;
  }
}
