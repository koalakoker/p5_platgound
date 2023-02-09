class stateAddRect extends AddState {
  constructor() {
    super();
  }
  mousePressed() {
    super.mousePressed();
    let point = drawing.grid.snap(mouseX, mouseY);
    this.newElement = new Rectangle(point.x, point.y, point.x, point.y);
  }
  mouseDragged() {
    if (this.dragging) {
      let point = drawing.grid.snap(mouseX, mouseY);
      this.newElement.x2 = point.x;
      this.newElement.y2 = point.y;
    }
  }
  draw() {
    if (this.newElement) {
      this.newElement.draw();
    }
  }
}
