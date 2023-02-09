class Rectangle extends Element {
  constructor(x1, y1, x2, y2) {
    super();
    this.id = 3;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  draw() {
    super.draw();
    rectMode(CORNERS);
    rect(this.x1, this.y1, this.x2, this.y2);
    rectMode(CORNER);
  }
  inside(x, y) {
    let left;
    let top;
    let w;
    let h;
    if (this.x1 < this.x2) {
      left = this.x1;
      w = this.x2 - this.x1;
    } else {
      left = this.x2;
      w = this.x1 - this.x2;
    }
    if (this.y1 < this.y2) {
      top = this.y1;
      h = this.y2 - this.y1;
    } else {
      top = this.y2;
      h = this.y1 - this.y2;
    }
    return Rect.inside(x || mouseX, y || mouseY, left, top, w, h);
  }
  serialize() {
    const base = super.serialize();
    const child = {
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
    };

    return JSON.stringify({
      ...base,
      ...child,
    });
  }
}
