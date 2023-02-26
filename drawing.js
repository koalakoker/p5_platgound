const url = "http://localhost:3000";

class Drawing {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.drawElement = [];
    this.selectedElements = [];
  }
  setup() {
    createCanvas(this.w, this.h);
    this.grid = new Grid(20);
    this.grid.active = true;
    this.newElementStyle = new Style();
    this.state = new StateSelect();
    this.load().catch(() => {
      gui.showBackendNotAvailableError();
    });
    store.addState();
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
    this.w = window.innerWidth;
    this.h = window.innerHeight;
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
  save() {
    httpPost(url, "json", JSON.parse(this.serialize()), function (result) {});
  }
  serialize() {
    let serialList = [];
    for (let i = 0; i < this.drawElement.length; i++) {
      serialList.push(JSON.parse(this.drawElement[i].serialize()));
    }
    return JSON.stringify({ w: this.w, h: this.h, elements: serialList });
  }
  load() {
    return httpGet(url, "text", false, (jsonText) => {
      this.deserialize(jsonText);
    });
  }
  deserialize(jsonString) {
    this.clear();
    let json = JSON.parse(jsonString);
    this.w = json.w;
    this.h = json.h;
    const elements = json.elements;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      this.drawElement.push(new Element().deserialize(JSON.stringify(element)));
    }
  }
}
