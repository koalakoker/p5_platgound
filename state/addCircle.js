class stateAddCircle {
  constructor() {}
  mousePressed() {
    this.center = createVector(mouseX, mouseY);
    this.newElement = new Circle(mouseX, mouseY, 0);
  }
  mouseReleased() {
    return this.newElement;
  }
  mouseDragged() {
    this.newElement.r = dist(this.center.x, this.center.y, mouseX, mouseY);
  }
  draw() {
    if (this.newElement) {
      this.newElement.draw();
    }
  }
}
