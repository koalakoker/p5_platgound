class StateAdd extends State {
  constructor() {
    super();
    this.dragging = false;
  }
  mousePressed() {
    this.dragging = true;
  }
  mouseReleased() {
    if (this.dragging) {
      this.dragging = false;
      if (this.newElement) {
        if (this.newElement.isEmpty()) {
          drawing.changeState(new StateSelect());
          addBar.changeSelection(null, false);
          drawing.state.mousePressed();
        } else {
          drawing.drawElement.push(this.newElement);
        }
        this.newElement = null;
      }
    }
  }
  mouseDragged() {
    if (this.dragging) {
      let point = drawing.grid.snap(mouseX, mouseY);
      this.newElement.addPoint(point);
    }
  }
}
