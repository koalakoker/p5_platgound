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
    this.setStyle();
    rectMode(CORNERS);
    rect(this.x1, this.y1, this.x2, this.y2);
    rectMode(CORNER);
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
