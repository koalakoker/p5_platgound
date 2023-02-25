class StateAddRect extends StateAdd {
  constructor() {
    super();
  }
  mousePressed() {
    super.mousePressed();
    let point = drawing.grid.snap(mouseX, mouseY);
    this.newElement = new Rectangle(
      point.x,
      point.y,
      point.x,
      point.y
    ).addStyle(new Style(drawing.newElementStyle));
  }
  draw() {
    if (this.newElement) {
      this.newElement.draw();
    }
  }
}
