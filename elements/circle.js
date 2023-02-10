class Circle extends Element {
  constructor(x, y, r) {
    super();
    this.id = 2;
    this.x = x;
    this.y = y;
    this.r = r;
  }
  draw() {
    super.draw();
    circle(this.x, this.y, this.r * 2);
  }
  move(mx, my) {
    this.x += mx;
    this.y += my;
  }
  inside(x, y) {
    return (
      (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y) <
      this.r * this.r
    );
  }
  isEmpty() {
    return this.r === 0;
  }
  serialize() {
    const base = super.serialize();
    const child = {
      x: this.x,
      y: this.y,
      r: this.r,
    };

    return JSON.stringify({
      ...base,
      ...child,
    });
  }
}
