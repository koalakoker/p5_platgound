class StateSelect extends State {
  constructor() {
    super();
    this.index = 0;
    this.selectionArea = new SelectionArea();
  }
  draw() {
    this.selectionArea.draw();
    Drawing.getInstance().selectedElements.forEach((element) => {
      element.showControls();
    });
  }
  mousePressed(x, y) {
    const point = Drawing.getInstance().grid.snap(x, y);
    this.clickPoint = p5js.createVector(point.x, point.y);
    if (
      this.actionOnControls((control) => {
        return control.mousePressed(x, y);
      })
    ) {
      return;
    }

    let pointedElements = Drawing.getInstance().elementsAtPoint(x, y);
    p5js.reverse(pointedElements);
    const selNum = pointedElements.length;
    if (selNum > 0) {
      if (this.index > selNum - 1) {
        this.index = 0;
      }
      let selected = pointedElements[this.index];
      this.index++;
      if (!selected.selected) {
        if (!p5js.keyIsDown(p5js.SHIFT)) {
          Drawing.getInstance().deSelectAll();
        }
        Drawing.getInstance().selectElement(selected, true);
      }
    } else {
      if (!p5js.keyIsDown(p5js.SHIFT)) {
        Drawing.getInstance().deSelectAll();
      }
      this.selectionArea.mousePressed(x, y);
    }
  }
  mouseReleased(x, y) {
    this.actionOnControls((control) => control.mouseReleased(x, y));
    this.selectionArea.mouseReleased(x, y);
  }
  mouseDragged(x, y) {
    if (
      this.actionOnControls((control) => {
        return control.mouseDragged(x, y);
      })
    ) {
      return;
    }

    let selectedElements = Drawing.getInstance().selectedElements;
    if (selectedElements.length > 0 && !p5js.keyIsDown(p5js.SHIFT)) {
      // Drag selected elemnts
      const point = Drawing.getInstance().grid.snap(x, y);
      const d = p5.Vector.sub(point, this.clickPoint);
      this.clickPoint = point;
      selectedElements.forEach((element) => {
        element.move(d.x, d.y);
      });
    } else {
      this.selectionArea.mouseDragged(x, y);
    }
  }
  actionOnControls(action) {
    let found = 0;
    for (let i = 0; i < Drawing.getInstance().selectedElements.length; i++) {
      const element = Drawing.getInstance().selectedElements[i];
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
