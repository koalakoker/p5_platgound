class stateAddRect {
  constructor() {}
  mousePressed() {
    this.newElement = new Rectangle(mouseX, mouseY, mouseX, mouseY);
  }
  mouseReleased() {
    return this.newElement;
  }
  mouseDragged() {
    this.newElement.x2 = mouseX;
    this.newElement.y2 = mouseY;
  }
  draw() {
    if (this.newElement) {
      this.newElement.draw();
    }
  }
}
