class Grid {
  constructor(space) {
    this.space = space;
    this.active = false;
  }
  snap(x, y) {
    let returnPoint = createVector(x, y);
    if (this.active) {
      let snapX = round(x / this.space) * this.space;
      let snapY = round(y / this.space) * this.space;
      returnPoint.x = snapX;
      returnPoint.y = snapY;
    }
    return returnPoint;
  }
  display() {
    if (this.active) {
      stroke(255);
      strokeWeight(1);
      const drawing = Drawing.getInstance();
      for (let row = 0; row < drawing.h / this.space; row++) {
        for (let col = 0; col < drawing.w / this.space; col++) {
          point(col * this.space, row * this.space);
        }
      }
    }
  }
}
