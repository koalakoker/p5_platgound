class Slider {
  constructor(w, h) {
    this.x = 0;
    this.y = 0;
    this.value = h / 2;
    this.w = w;
    this.h = h;
    this.cursorFill = 255;
  }
  display(x, y) {
    this.x = x;
    this.y = y;
    rect(x, y, this.w, this.h);
    noStroke();
    fill(this.cursorFill);
    const dividers = 20;
    this.cH = this.h / dividers;
    this.cY = this.y + this.value - this.cH / 2;
    rect(this.x, this.cY, this.w, this.cH);
  }
  inside() {
    return Rect.inside(mouseX, mouseY, this.x, this.y, this.w, this.h);
  }
  onCursor() {
    return Rect.inside(mouseX, mouseY, this.x, this.cY, this.x, this.cH);
  }
  mouseMoved() {
    if (this.onCursor()) {
      this.cursorFill = color(255, 255, 0);
    } else {
      this.cursorFill = color(255);
    }
  }
}
