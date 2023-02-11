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
  mousePressed() {
    const point = drawing.grid.snap(mouseX, mouseY);
    this.clickPoint = createVector(point.x, point.y);
    if (
      this.actionOnControls((control) => {
        return control.mousePressed();
      })
    ) {
      return;
    }

    let pointedElements = drawing.elementsAtPoint(mouseX, mouseY);
    reverse(pointedElements);
    const selNum = pointedElements.length;
    if (selNum > 0) {
      if (this.index > selNum - 1) {
        this.index = 0;
      }
      let selected = pointedElements[this.index];
      this.index++;
      if (!selected.selected) {
        if (!keyIsDown(SHIFT)) {
          drawing.deSelectAll();
        }
        drawing.selectElement(selected, true);
      }
    } else {
      if (!keyIsDown(SHIFT)) {
        drawing.deSelectAll();
      }
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
    if (selectedElements.length > 0 && !keyIsDown(SHIFT)) {
      // Drag selected elemnts
      const point = drawing.grid.snap(mouseX, mouseY);
      const d = p5.Vector.sub(point, this.clickPoint);
      this.clickPoint = point;
      selectedElements.forEach((element) => {
        element.move(d.x, d.y);
      });
    } else {
      this.selectionArea.mouseDragged();
    }
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
}
