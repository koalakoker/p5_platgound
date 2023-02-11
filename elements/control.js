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
      stroke(255, 255, 0);
    } else {
      stroke(255);
    }
    strokeWeight(this.r);
    point(this.x, this.y);
  }
  inside(x, y) {
    return (
      (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y) <
      this.r * this.r
    );
  }
  mousePressed() {
    if (this.inside(mouseX, mouseY)) {
      this.dragged = true;
      return true;
    }
  }
  mouseReleased() {
    this.dragged = false;
  }
  mouseDragged() {
    if (this.dragged) {
      this.x += movedX;
      this.y += movedY;
      if (this.cbUpdated) {
        this.cbUpdated({ x: this.x, y: this.y });
      }
      return true;
    }
  }
}
