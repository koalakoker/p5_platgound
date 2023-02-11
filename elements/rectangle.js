class Rectangle extends Element {
  constructor(x1, y1, x2, y2) {
    super();
    this.id = 3;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.controls.push(new Control(x1, y1));
    this.controls.push(new Control(x2, y2));
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
  }
  isInsideArea(area) {
    const r = Rect.rect({ x: this.x1, y: this.y1 }, { x: this.x2, y: this.y2 });
    const a = Rect.rect(area.p1, area.p2);
    return collideRectRect(r.left, r.top, r.w, r.h, a.left, a.top, a.w, a.h);
  }
  inside(x, y) {
    const r = Rect.rect({ x: this.x1, y: this.y1 }, { x: this.x2, y: this.y2 });
    return Rect.inside(x || mouseX, y || mouseY, r.left, r.top, r.w, r.h);
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
