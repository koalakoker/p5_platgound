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
    this.grid = new Grid(20);
    this.grid.active = true;

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
    this.grid.display();
    for (let i = 0; i < this.drawElement.length; i++) {
      const element = this.drawElement[i];
      element.draw();
    }
    if (this.state) {
      this.state.draw();
    }
  }
  clear() {
    this.drawElement = [];
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

  changeState(state) {
    this.state = state;
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
      if (this.dragging) {
        if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
          this.dragging = false;
          this.drawElement.push(this.state.mouseReleased());
          this.state.newElement = null;
        }
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
