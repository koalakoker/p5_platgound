class StateSelect extends State {
  constructor() {
    super();
    this.selected;
    this.lastSelected;
    this.index = 0;
    this.selectionArea = {
      visible: false,
      p1: createVector(),
      p2: createVector(),
    };
  }
  draw() {
    if (this.selectionArea.visible) {
      stroke(255);
      strokeWeight(1);
      noFill();
      const p1 = this.selectionArea.p1;
      const p2 = this.selectionArea.p2;
      rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    }
  }
  mousePressed() {
    drawing.deSelectAll();
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
      this.selectionArea.p1.x = mouseX;
      this.selectionArea.p1.y = mouseY;
      this.selectionArea.p2.x = mouseX;
      this.selectionArea.p2.y = mouseY;
      this.selectionArea.visible = true;
    }
  }
  mouseReleased() {
    if (this.selectionArea.visible) {
      drawing.selectArea(this.selectionArea);
      this.selectionArea.visible = false;
    }
  }
  mouseDragged() {
    let selectedElements = drawing.selectedElements;
    if (selectedElements.length > 0) {
      selectedElements.forEach((element) => {
        element.move(movedX, movedY);
      });
    } else {
      this.selectionArea.p2.x = mouseX;
      this.selectionArea.p2.y = mouseY;
    }
  }
}
