const url = "http://localhost:3000";

class Drawing {
  constructor(w, h) {
    this.w = w || 0;
    this.h = h || 0;
    this.drawElements = [];
    this.selectedElements = [];

    this.grid = new Grid(20);
    this.newElementStyle = new Style();
    this.state = new StateSelect();
  }
  static getInstance() {
    if (!Drawing.instance) {
      Object.defineProperty(Drawing, "instance", {
        value: new Drawing(window.innerWidth, window.innerHeight),
        writable: false,
        enumerable: true,
        configurable: false,
      });
    }
    return Drawing.instance;
  }
  setup() {
    return new Promise((resolve, reject) => {
      p5js.createCanvas(this.w, this.h);
      Store.getInstance().clear();
      this.load()
        .then(() => {
          Store.getInstance().addState();
          resolve();
        })
        .catch((err) => {
          const gui = Gui.getInstance();
          gui.showBackendNotAvailableError();
          console.log(err);
          reject();
        });
    });
  }
  display() {
    p5js.background(0);
    this.grid.display();
    for (let i = 0; i < this.drawElements.length; i++) {
      const element = this.drawElements[i];
      element.draw();
    }
    if (this.state) {
      this.state.draw();
    }
  }
  addNewElement(newElement) {
    this.drawElements.push(newElement);
  }
  getElements() {
    return this.drawElements;
  }
  clear() {
    this.drawElements = [];
    this.selectedElements = [];
    this.w = window.innerWidth;
    this.h = window.innerHeight;
  }

  elementsAtPoint(x, y) {
    // Select which elements are present at point x,y
    const elements = [];
    for (let i = 0; i < this.drawElements.length; i++) {
      if (this.drawElements[i].inside(x, y)) {
        elements.push(this.drawElements[i]);
      }
    }
    return elements;
  }

  changeState(state) {
    this.state = state;
  }
  mousePressed() {
    if (this.state) {
      if (this.inside()) {
        this.state.mousePressed();
      }
    }
  }
  inside() {
    return Rect.inside(p5js.mouseX, p5js.mouseY, 0, 0, this.w, this.h);
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
    for (let i = 0; i < this.drawElements.length; i++) {
      const element = this.drawElements[i];
      if (element.selected) {
        this.selectedElements.push(element);
      }
    }
  }
  selectArea(selectionArea) {
    for (let i = 0; i < this.drawElements.length; i++) {
      const element = this.drawElements[i];
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
    this.drawElements.forEach((element) => {
      element.selected = false;
    });
    this.selectedElements = [];
  }

  forceStateSelect() {
    this.changeState(new StateSelect());
    Gui.getInstance().resetAddBar();
    this.state.mousePressed();
  }

  save() {
    return p5js.httpPost(
      url,
      "json",
      JSON.parse(this.serialize()),
      function (result) {}
    );
  }
  load() {
    return p5js.httpGet(url, "text", false, (jsonTxt) => {
      this.deserialize(jsonTxt);
    });
  }
  serialize() {
    let serialList = [];
    for (let i = 0; i < this.drawElements.length; i++) {
      serialList.push(JSON.parse(this.drawElements[i].serialize()));
    }
    return JSON.stringify({ w: this.w, h: this.h, elements: serialList });
  }
  deserialize(jsonString) {
    this.clear();
    let json = JSON.parse(jsonString);
    this.w = json.w;
    this.h = json.h;
    const elements = json.elements;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      this.drawElements.push(Element.deserialize(JSON.stringify(element)));
    }
  }
}
