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
  mousePressed() {
    const point = Drawing.getInstance().grid.snap(p5js.mouseX, p5js.mouseY);
    this.clickPoint = p5js.createVector(point.x, point.y);
    if (
      this.actionOnControls((control) => {
        return control.mousePressed();
      })
    ) {
      return;
    }

    let pointedElements = Drawing.getInstance().elementsAtPoint(
      p5js.mouseX,
      p5js.mouseY
    );
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

    let selectedElements = Drawing.getInstance().selectedElements;
    if (selectedElements.length > 0 && !keyIsDown(SHIFT)) {
      // Drag selected elemnts
      const point = Drawing.getInstance().grid.snap(mouseX, mouseY);
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
