class Circle extends Element {
  constructor(x, y, r) {
    super();
    this.id = 2;
    this.x = x;
    this.y = y;
    this.r = r;
    const c1 = new Control(x, y, (p) => {
      this.x = p.x;
      this.y = p.y;
      this.controls[1].x = p.x + this.r;
      this.controls[1].y = p.y;
    });
    const c2 = new Control(x + r, y, (p) => {
      this.r = p.x - this.x;
      this.controls[1].y = this.y;
    });
    this.controls.push(c1);
    this.controls.push(c2);
  }
  draw() {
    super.draw();
    circle(this.x, this.y, this.r * 2);
  }
  move(mx, my) {
    this.x += mx;
    this.y += my;
  }
  isInsideArea(area) {
    const a = Rect.rect(area.p1, area.p2);
    return collideRectCircle(
      a.left,
      a.top,
      a.w,
      a.h,
      this.x,
      this.y,
      this.r * 2
    );
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
