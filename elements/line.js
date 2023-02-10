class Line extends Element {
  constructor(x1, y1, x2, y2) {
    super();
    this.id = 1;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  rotCCW(p, th) {
    let t00 = cos(th);
    let t11 = t00;
    let t01 = sin(th);
    let t10 = -t01;
    return createVector(t00 * p.x + t01 * p.y, t10 * p.x + t11 * p.y);
  }
  rotCW(p, th) {
    let t00 = cos(th);
    let t11 = t00;
    let t01 = -sin(th);
    let t10 = -t01;
    return createVector(t00 * p.x + t01 * p.y, t10 * p.x + t11 * p.y);
  }
  draw() {
    super.draw();
    line(this.x1, this.y1, this.x2, this.y2);
  }
  move(mx, my) {
    this.x1 += mx;
    this.x2 += mx;
    this.y1 += my;
    this.y2 += my;
  }
  inside(x, y) {
    let p1 = createVector(this.x1, this.y1);
    let p2 = createVector(this.x2, this.y2);
    let s = p5.Vector.sub(p2, p1);
    let m = p5.Vector.add(p1, p2).div(2);
    let th = s.heading();
    let l = s.mag();
    let margin = 5;
    let r11 = createVector(-l / 2 - margin, -margin);
    let h = 2 * margin;
    let w = l + h;
    let ms = createVector(x, y);
    ms.sub(m);
    ms = this.rotCCW(ms, th);
    return Rect.inside(ms.x, ms.y, r11.x, r11.y, w, h);
  }
  isEmpty() {
    return this.x1 === this.x2 && this.y1 === this.y2;
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
