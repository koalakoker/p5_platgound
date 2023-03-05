class Slider {
  constructor(value, w, h, cbValueChanged) {
    this.x = 0;
    this.y = 0;
    this.value = value;
    this.w = w;
    this.h = h;
    this.cursorFill = 255;
    this.cbValueChanged = cbValueChanged;
    this.dragged = false;
  }
  display(x, y) {
    this.x = x;
    this.y = y;
    p5js.fill(0);
    p5js.stroke(255);
    p5js.strokeWeight(1);
    p5js.rect(x, y, this.w, this.h);
    p5js.noStroke();
    p5js.fill(this.cursorFill);
    const dividers = 10;
    this.cH = this.h / dividers;
    this.cY = this.y + this.value - this.cH / 2;
    p5js.rect(this.x, this.cY, this.w, this.cH);
  }
  inside() {
    return this.dragged
      ? true
      : Rect.inside(p5js.mouseX, p5js.mouseY, this.x, this.y, this.w, this.h);
  }
  onCursor() {
    return Rect.inside(
      p5js.mouseX,
      p5js.mouseY,
      this.x,
      this.cY,
      this.x,
      this.cH
    );
  }
  mouseDragged() {
    this.setValue(p5js.mouseY - this.y);
  }
  mousePressed() {
    this.cursorFill = color(255, 255, 0);
    this.dragged = true;
    this.setValue(p5js.mouseY - this.y);
  }
  mouseReleased() {
    this.dragged = false;
  }
  setValue(value) {
    this.value = constrain(value, 0, this.h);
    if (this.cbValueChanged) {
      this.cbValueChanged(this.value);
    }
  }
}
