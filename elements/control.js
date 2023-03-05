class Control {
  constructor(x, y, cbUpdated) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.dragged = false;
    this.cbUpdated = cbUpdated;
  }
  draw() {
    if (this.dragged) {
      p5js.stroke(255, 255, 0);
    } else {
      p5js.stroke(255);
    }
    p5js.strokeWeight(this.r);
    p5js.point(this.x, this.y);
  }
  inside(x, y) {
    return (
      (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y) <
      this.r * this.r
    );
  }
  mousePressed(x, y) {
    if (this.inside(x, y)) {
      this.dragged = true;
      return true;
    }
    return false;
  }
  mouseReleased(x, y) {
    this.dragged = false;
  }
  mouseDragged(x, y) {
    if (this.dragged) {
      let point = Drawing.getInstance().grid.snap(x, y);
      this.x = point.x;
      this.y = point.y;
      if (this.cbUpdated) {
        this.cbUpdated({ x: this.x, y: this.y });
      }
      return true;
    }
  }
}
