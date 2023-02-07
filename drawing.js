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
  serialize() {
    //let thisJSON = JSON.stringify({ w: this.w, h: this.h });
    let serialList = [];
    for (let i = 0; i < this.drawElement.length; i++) {
      serialList.push(JSON.parse(this.drawElement[i].serialize()));
    }
    this.serialTxt = JSON.stringify(serialList);
    //saveJSON(this, "drawing.json");
  }
  deserialize() {
    // drawing = loadJSON("drawing.json", () => {
    //   Object.setPrototypeOf(drawing, new Drawing(100, 100));
    //   Object.setPrototypeOf(drawing.grid, new Grid(20));
    // });
    print("Deserialize");
    let deserialList = JSON.parse(this.serialTxt);
    this.drawElement = []; // Clear drawing
    for (let i = 0; i < deserialList.length; i++) {
      const element = deserialList[i];
      if (element.id === 1) {
        let line = new Line(element.x1, element.y1, element.x2, element.y2);
        let style = new Style();
        style.fill = element.style.fill;
        style.fillColor = color(
          element.style.fillColor.r,
          element.style.fillColor.g,
          element.style.fillColor.b
        );
        style.stroke = element.style.stroke;
        style.strokeColor = color(
          element.style.strokeColor.r,
          element.style.strokeColor.g,
          element.style.strokeColor.b
        );
        line.style = style;
        this.drawElement.push(line);
      }
    }
  }
}
