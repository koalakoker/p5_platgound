class StateAddCircle extends StateAdd {
  constructor() {
    super();
  }
  mousePressed() {
    super.mousePressed();
    this.center = drawing.grid.snap(mouseX, mouseY);
    this.newElement = new Circle(this.center.x, this.center.y, 0);
  }
  mouseDragged() {
    if (this.dragging) {
      let point = drawing.grid.snap(mouseX, mouseY);
      this.newElement.r = dist(this.center.x, this.center.y, point.x, point.y);
    }
  }
  draw() {
    if (this.newElement) {
      this.newElement.draw();
    }
  }
}
