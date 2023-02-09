class StateSelect extends State {
  constructor() {
    super();
    this.selectedElements = [];
    this.selected;
    this.lastSelected;
    this.index = 0;
  }
  draw() {}
  mousePressed() {
    this.selectedElements = drawing.elementsAtPoint(mouseX, mouseY);
    reverse(this.selectedElements);
    const selNum = this.selectedElements.length;
    if (selNum > 0) {
      if (this.index > selNum - 1) {
        this.index = 0;
      }
      let selected = this.selectedElements[this.index];
      this.index++;
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
