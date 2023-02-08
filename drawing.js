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
    //saveJSON(serialList, "drawing.json");
    let postData = {
      w: 100,
      h: 200,
    };
    const url = "http://localhost:3000";
    httpPost(url, "json", serialList, function (result) {
      console.log(result);
    });
  }
  deserialize() {
    // loadJSON("drawing.json", (json) => {
    //   this.drawElement = []; // Clear drawing
    //   for (let i = 0; i < json.length; i++) {
    //     const element = json[i];
    //     this.drawElement.push(
    //       new Element().deserialize(JSON.stringify(element))
    //     );
    //   }
    // });

    const url = "http://localhost:3000";
    httpGet(url, "json", false, (res) => {
      console.log(res);
    });
  }
}
