class stateAddCircle extends AddState {
  constructor(grid) {
    super(grid);
  }
  mousePressed() {
    this.center = this.grid.snap(mouseX, mouseY);
    this.newElement = new Circle(this.center.x, this.center.y, 0);
  }
  mouseReleased() {
    return this.newElement;
  }
  mouseDragged() {
    let point = this.grid.snap(mouseX, mouseY);
    this.newElement.r = dist(this.center.x, this.center.y, point.x, point.y);
  }
  draw() {
    if (this.newElement) {
      this.newElement.draw();
    }
  }
}
