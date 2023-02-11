class Rectangle extends Element {
  constructor(x1, y1, x2, y2) {
    super();
    this.id = 3;
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
    rectMode(CORNERS);
    rect(this.x1, this.y1, this.x2, this.y2);
    rectMode(CORNER);
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
    const r = Rect.rect({ x: this.x1, y: this.y1 }, { x: this.x2, y: this.y2 });
    const a = Rect.rect(area.p1, area.p2);
    return collideRectRect(r.x, r.y, r.w, r.h, a.x, a.y, a.w, a.h);
  }
  inside(x, y) {
    const r = Rect.rect({ x: this.x1, y: this.y1 }, { x: this.x2, y: this.y2 });
    return Rect.inside(x || mouseX, y || mouseY, r.x, r.y, r.w, r.h);
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
