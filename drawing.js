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

      //this.load();
      getFileNames()
        .then((fileNames) => {
          Gui.getInstance().addWindw(new WindW(600, 400, 0, fileNames));
        })
        .catch((err) => {
          console.log(err);
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
  mousePressed(x, y) {
    if (this.state) {
      if (this.inside(x, y)) {
        this.state.mousePressed(x, y);
      }
    }
  }
  inside(x, y) {
    return Rect.inside(x, y, 0, 0, this.w, this.h);
  }
  mouseReleased(x, y) {
    if (this.state) {
      this.state.mouseReleased(x, y);
    }
  }
  mouseDragged(x, y) {
    if (this.state) {
      this.state.mouseDragged(x, y);
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
    saveFile(this.serialize(), getNow());
  }
  load() {
    httpGet(url, (jsonTxt) => {
      if (jsonTxt === "[]") {
        throw 1000;
      } else {
        this.deserialize(jsonTxt);
      }
    })
      .then(() => {
        Store.getInstance().addState();
        Gui.getInstance().diagMngr.addMessage("Sketch has been loaded");
      })
      .catch((err) => {
        if (err === 1000) {
          Store.getInstance().addState();
          Gui.getInstance().diagMngr.addMessage("No sketches on the server");
          return;
        }

        if (err === 401) {
          // Unauthorized
          localStorage.clear();
          window.location.replace("login.html");
        }

        const gui = Gui.getInstance();
        gui.showBackendNotAvailableError();
        console.log(err);
      });
    return;
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
