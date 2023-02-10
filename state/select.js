class StateSelect extends State {
  constructor() {
    super();
    this.selected;
    this.lastSelected;
    this.index = 0;
  }
  draw() {}
  mousePressed() {
    let selectedElements = drawing.elementsAtPoint(mouseX, mouseY);
    reverse(selectedElements);
    const selNum = selectedElements.length;
    if (selNum > 0) {
      if (this.index > selNum - 1) {
        this.index = 0;
      }
      let selected = selectedElements[this.index];
      this.index++;
      if (this.lastSelected != selected) {
        if (keyCode == SHIFT) {
        } else {
          if (this.lastSelected) {
            drawing.selectElement(this.lastSelected, false);
          }
        }
        drawing.selectElement(selected, true);
        this.lastSelected = selected;
      }
    } else {
      drawing.deSelectAll();
    }
  }
  mouseReleased() {}
  mouseDragged() {
    let selectedElements = drawing.selectedElements;
    if (selectedElements.length > 0) {
      selectedElements.forEach((element) => {
        element.move(movedX, movedY);
      });
    }
  }
}
