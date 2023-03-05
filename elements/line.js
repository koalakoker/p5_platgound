class Line extends Element {
  constructor(x1, y1, x2, y2) {
    super();
    this.id = 1;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.controls.push(
      new Control(x1, y1, (p) => {
        this.x1 = p.x;
        this.y1 = p.y;
      })
    );
    this.controls.push(
      new Control(x2, y2, (p) => {
        this.x2 = p.x;
        this.y2 = p.y;
      })
    );
  }
  draw() {
    super.draw();
    p5js.line(this.x1, this.y1, this.x2, this.y2);
  }
  move(mx, my) {
    this.x1 += mx;
    this.x2 += mx;
    this.y1 += my;
    this.y2 += my;
    this.controls[0].x = this.x1;
    this.controls[0].y = this.y1;
    this.controls[1].x = this.x2;
    this.controls[1].y = this.y2;
  }
  addPoint(point) {
    this.x2 = point.x;
    this.y2 = point.y;
    this.controls[1].x = this.x2;
    this.controls[1].y = this.y2;
  }
  isInsideArea(area) {
    const a = Rect.rect(area.p1, area.p2);
    return (
      collidePointRect(this.x1, this.y1, a.x, a.y, a.w, a.h) ||
      collidePointRect(this.x2, this.y2, a.x, a.y, a.w, a.h) ||
      collideLineRect(this.x1, this.y1, this.x2, this.y2, a.x, a.y, a.w, a.h)
    );
  }
  inside(x, y) {
    let p1 = p5js.createVector(this.x1, this.y1);
    let p2 = p5js.createVector(this.x2, this.y2);
    let p = p5js.createVector(x, y);
    let d12 = p5.Vector.sub(p2, p1).mag();
    let d1 = p5.Vector.sub(p, p1).mag();
    let d2 = p5.Vector.sub(p, p2).mag();
    let diff = d1 + d2 - d12;
    return diff <= 5;
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
}
