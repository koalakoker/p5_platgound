let newElementStyle = null;

class Drawing {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.drawElement = [];
    this.dragging = false;
    this.state = null;
  }
  setup() {
    createCanvas(this.w, this.h);
    this.sel = createSelect();
    this.sel.drawing = this;
    this.sel.option("");
    this.sel.option("addLine");
    this.sel.option("addCircle");
    this.sel.option("addRect");
    this.sel.changed(this.changeMode);

    this.sel.selected("addCircle");
    this.state = new stateAddCircle();
    console.log(this.sel);

    newElementStyle = new Style();
    this.fillCheck = createCheckbox("fill", newElementStyle.fill);
    this.fillCheck.changed(this.fillCheckClick);
    this.fillColorPicker = createColorPicker(newElementStyle.fillColor);
    this.fillColorPicker.input(this.changeFillColor);
    this.strokeCheck = createCheckbox("stroke", newElementStyle.stroke);
    this.strokeCheck.changed(this.strokeCheckClick);
    this.strokeColorPicker = createColorPicker(newElementStyle.strokeColor);
    this.strokeColorPicker.input(this.changeStrokeColor);
  }
  draw() {
    background(0);
    for (let i = 0; i < this.drawElement.length; i++) {
      const element = this.drawElement[i];
      element.draw();
    }
    if (this.state) {
      this.state.draw();
    }
  }

  fillCheckClick() {
    newElementStyle.fill = this.fillCheck.checked();
  }

  strokeCheckClick() {
    newElementStyle.stroke = this.strokeCheck.checked();
  }

  changeFillColor() {
    newElementStyle.fillColor = this.fillColorPicker.color();
  }

  changeStrokeColor() {
    newElementStyle.strokeColor = this.strokeColorPicker.color();
  }

  changeMode() {
    let selected = this.value();
    switch (selected) {
      case "addLine":
        this.drawing.state = new stateAddLine();
        break;
      case "addCircle":
        this.drawing.state = new stateAddCircle();
        break;
      case "addRect":
        this.drawing.state = new stateAddRect();
        break;

      default:
        this.drawing.state = null;
        break;
    }
  }
  mousePressed() {
    if (this.state) {
      if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
        this.dragging = true;
        this.state.mousePressed();
      }
    }
  }

  mouseReleased() {
    if (this.state) {
      if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
        this.dragging = false;
        this.drawElement.push(this.state.mouseReleased());
      }
    }
  }

  mouseDragged() {
    if (this.state) {
      if (this.dragging) {
        this.state.mouseDragged();
      }
    }
  }
}
