class Circle extends Element {
  constructor(x, y, r) {
    super();
    this.x = x;
    this.y = y;
    this.r = r;
  }
  draw() {
    this.setStyle();
    circle(this.x, this.y, this.r * 2);
  }
}
