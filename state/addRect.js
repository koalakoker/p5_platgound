class StateAddRect extends StateAdd {
  constructor() {
    super();
  }
  mousePressed() {
    super.mousePressed();
    let point = Drawing.getInstance().grid.snap(p5js.mouseX, p5js.mouseY);
    this.newElement = new Rectangle(
      point.x,
      point.y,
      point.x,
      point.y
    ).addStyle(new Style(Drawing.getInstance().newElementStyle));
  }
  draw() {
    if (this.newElement) {
      this.newElement.draw();
    }
  }
}
