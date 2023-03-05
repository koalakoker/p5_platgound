class StateAddCircle extends StateAdd {
  constructor() {
    super();
  }
  mousePressed(x, y) {
    super.mousePressed(x, y);
    this.center = Drawing.getInstance().grid.snap(x, y);
    this.newElement = new Circle(this.center.x, this.center.y, 0).addStyle(
      new Style(Drawing.getInstance().newElementStyle)
    );
  }
  draw() {
    if (this.newElement) {
      this.newElement.draw();
    }
  }
}
