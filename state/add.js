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
          addBar.changeSelection(selectButton, true);
          drawing.state.mousePressed();
        } else {
          drawing.drawElement.push(this.newElement);
        }
        this.newElement = null;
      }
    }
  }
  mouseDragged() {}
}
