class StateAddLine extends StateAdd {
  constructor() {
    super();
  }
  mousePressed() {
    super.mousePressed();
    let point = drawing.grid.snap(mouseX, mouseY);
    this.newElement = new Line(point.x, point.y, point.x, point.y);
  }
  draw() {
    if (this.newElement) {
      this.newElement.draw();
    }
  }
}
