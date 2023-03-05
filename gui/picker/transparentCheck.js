class TransparentCheck {
  constructor(selected, cbCheckChanged) {
    this.selected = selected || false;
    this.cbCheckChanged = cbCheckChanged;
  }
  display(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    if (this.selected) {
      p5js.strokeWeight(2);
      p5js.stroke(255, 255, 0);
    } else {
      p5js.strokeWeight(1);
      p5js.stroke(255);
    }
    p5js.fill(0);
    p5js.rect(x, y, w, h);
    p5js.stroke(255, 0, 0);
    p5js.strokeWeight(2);
    p5js.line(x + 2, y + 2, x + w - 2, y + h - 2);
  }
  inside() {
    return Rect.inside(
      p5js.mouseX,
      p5js.mouseY,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
  mousePressed() {
    this.selected = !this.selected;
    if (this.cbCheckChanged) {
      this.cbCheckChanged(this.selected);
    }
  }
}
