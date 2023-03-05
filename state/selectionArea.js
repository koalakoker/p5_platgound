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
  mousePressed() {
    this.p1.x = p5js.mouseX;
    this.p1.y = p5js.mouseY;
    this.p2.x = p5js.mouseX;
    this.p2.y = p5js.mouseY;
    this.visible = true;
  }
  mouseReleased() {
    if (this.visible) {
      Drawing.getInstance().selectArea(this);
      this.visible = false;
    }
  }
  mouseDragged() {
    this.p2.x = p5js.mouseX;
    this.p2.y = p5js.mouseY;
  }
}
