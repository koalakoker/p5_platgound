const url = "http://localhost:3000";
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
  changeState(state) {
    this.state = state;
  }
  inside() {
    return Rect.inside(mouseX, mouseY, 0, 0, this.w, this.h);
  }
  mousePressed() {
    if (this.state) {
      if (this.inside()) {
        this.dragging = true;
        this.state.mousePressed();
      }
    }
  }
  mouseReleased() {
    if (this.state) {
      if (this.dragging) {
        this.dragging = false;
        this.drawElement.push(this.state.mouseReleased());
        this.state.newElement = null;
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

    httpPost(
      url,
      "json",
      { w: this.w, h: this.h, elements: serialList },
      function (result) {}
    );
  }
  deserialize() {
    httpGet(url, "json", false, (json) => {
      this.w = json.w;
      this.h = json.h;
      const elements = json.elements;
      this.drawElement = []; // Clear drawing
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        this.drawElement.push(
          new Element().deserialize(JSON.stringify(element))
        );
      }
    });
  }
}
