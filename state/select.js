class StateSelect extends State {
  constructor() {
    super();
    this.selectedElements = [];
    this.selected;
    this.lastSelected;
  }
  draw() {}
  mousePressed() {
    this.selectedElements = drawing.elementsAtPoint(mouseX, mouseY);
    if (this.selectedElements.length > 0) {
      let selected = this.selectedElements[0];
      if (this.lastSelected != selected) {
        if (this.lastSelected) {
          this.lastSelected.selected = false;
        }
        selected.selected = true;
        this.lastSelected = selected;
      }
    }
  }
  mouseReleased() {}
  mouseDragged() {}
}
