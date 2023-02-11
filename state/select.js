class StateSelect extends State {
  constructor() {
    super();
    this.index = 0;
    this.selectionArea = new SelectionArea();
  }
  draw() {
    this.selectionArea.draw();
    drawing.selectedElements.forEach((element) => {
      element.showControls();
    });
  }
  actionOnControls(action) {
    let found = 0;
    for (let i = 0; i < drawing.selectedElements.length; i++) {
      const element = drawing.selectedElements[i];
      for (let j = 0; j < element.controls.length; j++) {
        const control = element.controls[j];
        if (action(control)) {
          found++;
        }
      }
    }
    return found > 0;
  }
  mousePressed() {
    if (
      this.actionOnControls((control) => {
        return control.mousePressed();
      })
    ) {
      return;
    }

    drawing.deSelectAll();
    let pointedElements = drawing.elementsAtPoint(mouseX, mouseY);
    reverse(pointedElements);
    const selNum = pointedElements.length;
    if (selNum > 0) {
      if (this.index > selNum - 1) {
        this.index = 0;
      }
      let selected = pointedElements[this.index];
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
      this.selectionArea.mousePressed();
    }
  }
  mouseReleased() {
    this.actionOnControls((control) => control.mouseReleased());
    this.selectionArea.mouseReleased();
  }
  mouseDragged() {
    if (
      this.actionOnControls((control) => {
        return control.mouseDragged();
      })
    ) {
      return;
    }

    let selectedElements = drawing.selectedElements;
    if (selectedElements.length > 0) {
      selectedElements.forEach((element) => {
        element.move(movedX, movedY);
      });
    } else {
      this.selectionArea.mouseDragged();
    }
  }
}
