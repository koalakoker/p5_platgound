class Circle extends Element {
  constructor(x, y, r) {
    super();
    this.x = x;
    this.y = y;
    this.r = r;
    this.stroke = 255;
    this.fill = 0;
  }
  draw() {
    stroke(this.stroke);
    fill(this.fill);
    circle(this.x, this.y, this.r);
  }
}
