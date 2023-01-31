class stateAddRect extends AddState {
  constructor(grid) {
    super(grid);
  }
  mousePressed() {
    let point = this.grid.snap(mouseX, mouseY);
    this.newElement = new Rectangle(point.x, point.y, point.x, point.y);
  }
  mouseReleased() {
    return this.newElement;
  }
  mouseDragged() {
    let point = this.grid.snap(mouseX, mouseY);
    this.newElement.x2 = point.x;
    this.newElement.y2 = point.y;
  }
  draw() {
    if (this.newElement) {
      this.newElement.draw();
    }
  }
}
