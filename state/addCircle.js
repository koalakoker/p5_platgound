class StateAddCircle extends StateAdd {
  constructor() {
    super();
  }
  mousePressed() {
    super.mousePressed();
    this.center = Drawing.getInstance().grid.snap(mouseX, mouseY);
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
