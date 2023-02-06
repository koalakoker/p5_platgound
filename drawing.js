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
    this.newElementStyle = new Style();
  }
  display() {
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
