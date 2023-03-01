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
          Drawing.getInstance().changeState(new StateSelect());
          addBar.changeSelection(null, false);
          Drawing.getInstance().state.mousePressed();
        } else {
          Drawing.getInstance().addNewElement(this.newElement);
          Store.getInstance().addState();
        }
        this.newElement = null;
      }
    }
  }
  mouseDragged() {
    if (this.dragging) {
      let point = Drawing.getInstance().grid.snap(mouseX, mouseY);
      this.newElement.addPoint(point);
    }
  }
}
