class stateAddLine extends State {
  constructor() {
    super();
  }
  mousePressed() {
    let point = drawing.grid.snap(mouseX, mouseY);
    this.newElement = new Line(point.x, point.y, point.x, point.y);
  }
  mouseReleased() {
    return this.newElement;
  }
  mouseDragged() {
    let point = drawing.grid.snap(mouseX, mouseY);
    this.newElement.x2 = point.x;
    this.newElement.y2 = point.y;
  }
  draw() {
    if (this.newElement) {
      this.newElement.draw();
    }
  }
}
