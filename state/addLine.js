class StateAddLine extends StateAdd {
  constructor() {
    super();
  }
  mousePressed(x, y) {
    super.mousePressed();
    let point = Drawing.getInstance().grid.snap(x, y);
    this.newElement = new Line(point.x, point.y, point.x, point.y).addStyle(
      new Style(Drawing.getInstance().newElementStyle)
    );
  }
  draw() {
    if (this.newElement) {
      this.newElement.draw();
    }
  }
}
