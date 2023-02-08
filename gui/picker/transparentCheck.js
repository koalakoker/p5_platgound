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
      strokeWeight(2);
      stroke(255, 255, 0);
    } else {
      strokeWeight(1);
      stroke(255);
    }
    fill(0);
    rect(x, y, w, h);
    stroke(255, 0, 0);
    strokeWeight(2);
    line(x + 2, y + 2, x + w - 2, y + h - 2);
  }
  inside() {
    return Rect.inside(mouseX, mouseY, this.x, this.y, this.w, this.h);
  }
  mousePressed() {
    this.selected = !this.selected;
    if (this.cbCheckChanged) {
      this.cbCheckChanged(this.selected);
    }
  }
}
