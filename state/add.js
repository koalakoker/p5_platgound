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
        const drw = Drawing.getInstance();
        if (this.newElement.isEmpty()) {
          drw.forceStateSelect();
        } else {
          drw.addNewElement(this.newElement);
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
