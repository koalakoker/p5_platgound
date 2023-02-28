class SelectionArea {
  constructor() {
    this.visible = false;
    this.p1 = createVector();
    this.p2 = createVector();
  }
  draw() {
    if (this.visible) {
      stroke(255);
      strokeWeight(1);
      noFill();
      const p1 = this.p1;
      const p2 = this.p2;
      rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    }
  }
  mousePressed() {
    this.p1.x = mouseX;
    this.p1.y = mouseY;
    this.p2.x = mouseX;
    this.p2.y = mouseY;
    this.visible = true;
  }
  mouseReleased() {
    if (this.visible) {
      Drawing.getInstance().selectArea(this);
      this.visible = false;
    }
  }
  mouseDragged() {
    this.p2.x = mouseX;
    this.p2.y = mouseY;
  }
}
