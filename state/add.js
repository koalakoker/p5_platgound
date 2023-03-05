class StateAdd extends State {
  constructor() {
    super();
    this.dragging = false;
  }
  mousePressed(x, y) {
    this.dragging = true;
  }
  mouseReleased(x, y) {
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
  mouseDragged(x, y) {
    if (this.dragging) {
      let point = Drawing.getInstance().grid.snap(x, y);
      this.newElement.addPoint(point);
    }
  }
}
