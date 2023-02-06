class Slider {
  constructor(w, h, cbValueChanged) {
    this.x = 0;
    this.y = 0;
    this.value = h;
    this.w = w;
    this.h = h;
    this.cursorFill = 255;
    this.cbValueChanged = cbValueChanged;
    this.dragged = false;
  }
  display(x, y) {
    this.x = x;
    this.y = y;
    fill(0);
    stroke(255);
    strokeWeight(1);
    rect(x, y, this.w, this.h);
    noStroke();
    fill(this.cursorFill);
    const dividers = 20;
    this.cH = this.h / dividers;
    this.cY = this.y + this.value - this.cH / 2;
    rect(this.x, this.cY, this.w, this.cH);
  }
  inside() {
    const m = 10;
    return this.dragged
      ? true
      : Rect.inside(
          mouseX,
          mouseY,
          this.x - m,
          this.y - m,
          this.w + 2 * m,
          this.h + 2 * m
        );
  }
  onCursor() {
    return Rect.inside(mouseX, mouseY, this.x, this.cY, this.x, this.cH);
  }
  mouseDragged() {
    this.setValue(mouseY - this.y);
  }
  mousePressed() {
    this.cursorFill = color(255, 255, 0);
    this.dragged = true;
    this.setValue(mouseY - this.y);
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
