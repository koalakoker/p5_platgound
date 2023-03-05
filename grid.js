class Grid {
  constructor(space) {
    this.space = space;
    this.active = true;
  }
  activate() {
    this.active = true;
  }
  deActivate() {
    this.active = false;
  }
  snap(x, y) {
    let returnPoint = p5js.createVector(x, y);
    if (this.active) {
      let snapX = p5js.round(x / this.space) * this.space;
      let snapY = p5js.round(y / this.space) * this.space;
      returnPoint.x = snapX;
      returnPoint.y = snapY;
    }
    return returnPoint;
  }
  display() {
    if (this.active) {
      p5js.stroke(255);
      p5js.strokeWeight(1);
      const drawing = Drawing.getInstance();
      for (let row = 0; row < drawing.h / this.space; row++) {
        for (let col = 0; col < drawing.w / this.space; col++) {
          p5js.point(col * this.space, row * this.space);
        }
      }
    }
  }
}
