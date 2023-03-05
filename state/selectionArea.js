class SelectionArea {
  constructor() {
    this.visible = false;
    this.p1 = p5js.createVector();
    this.p2 = p5js.createVector();
  }
  draw() {
    if (this.visible) {
      p5js.stroke(255);
      p5js.strokeWeight(1);
      p5js.noFill();
      const p1 = this.p1;
      const p2 = this.p2;
      p5js.rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    }
  }
  mousePressed(x, y) {
    this.p1.x = x;
    this.p1.y = y;
    this.p2.x = x;
    this.p2.y = y;
    this.visible = true;
  }
  mouseReleased(x, y) {
    if (this.visible) {
      Drawing.getInstance().selectArea(this);
      this.visible = false;
    }
  }
  mouseDragged(x, y) {
    this.p2.x = x;
    this.p2.y = y;
  }
}
