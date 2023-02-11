const url = "http://localhost:3000";
class Drawing {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.drawElement = [];
    this.selectedElements = [];
    this.state = new StateSelect();
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
    this.selectedElements = [];
  }
  changeState(state) {
    this.state = state;
  }
  inside() {
    return Rect.inside(mouseX, mouseY, 0, 0, this.w, this.h);
  }
  elementsAtPoint(x, y) {
    // Select which elements are present at point x,y
    const elements = [];
    for (let i = 0; i < this.drawElement.length; i++) {
      if (this.drawElement[i].inside(x, y)) {
        elements.push(this.drawElement[i]);
      }
    }
    return elements;
  }
  mousePressed() {
    if (this.state) {
      if (this.inside()) {
        this.state.mousePressed();
      }
    }
  }
  mouseReleased() {
    if (this.state) {
      this.state.mouseReleased();
    }
  }
  mouseDragged() {
    if (this.state) {
      this.state.mouseDragged();
    }
  }
  keyPressed() {
    if (keyCode === BACKSPACE) {
      for (let i = this.drawElement.length - 1; i >= 0; i--) {
        const element = this.drawElement[i];
        if (element.selected) {
          this.drawElement.splice(i, 1);
        }
      }
      this.updateSelectedElements();
    }
  }

  updateSelectedElements() {
    this.selectedElements = [];
    for (let i = 0; i < this.drawElement.length; i++) {
      const element = this.drawElement[i];
      if (element.selected) {
        this.selectedElements.push(element);
      }
    }
  }
  selectArea(selectionArea) {
    for (let i = 0; i < this.drawElement.length; i++) {
      const element = this.drawElement[i];
      if (element.isInsideArea(selectionArea)) {
        this.selectElement(element, true);
      }
    }
  }
  selectElement(element, state) {
    element.selected = state;
    this.updateSelectedElements();
    // cb
  }
  deSelectAll() {
    this.drawElement.forEach((element) => {
      element.selected = false;
    });
    this.selectedElements = [];
  }
  serialize() {
    //let thisJSON = JSON.stringify({ w: this.w, h: this.h });
    let serialList = [];
    for (let i = 0; i < this.drawElement.length; i++) {
      serialList.push(JSON.parse(this.drawElement[i].serialize()));
    }

    httpPost(
      url,
      "json",
      { w: this.w, h: this.h, elements: serialList },
      function (result) {}
    );
  }
  deserialize() {
    drawing.clear();
    httpGet(url, "json", false, (json) => {
      this.w = json.w;
      this.h = json.h;
      const elements = json.elements;
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        this.drawElement.push(
          new Element().deserialize(JSON.stringify(element))
        );
      }
    });
  }
}
