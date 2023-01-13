class Rectangle extends Element {
  constructor(x1, y1, x2, y2) {
    super();
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  draw() {
    this.setStyle();
    rectMode(CORNERS);
    rect(this.x1, this.y1, this.x2, this.y2);
  }
}
