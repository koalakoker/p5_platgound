class Bar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.margin = 3;
    this.buttons = [];
    this.xPos = this.x;
    //this.append("png/addLine.png");
    //this.append("png/addRect.png");
    //this.append("png/addCircle.png");
  }
  preload() {
    this.buttons.forEach((button) => {
      button.preload();
    });
  }
  append(button) {
    button.x = this.xPos;
    button.y = this.y;
    this.buttons.push(button);
    this.xPos += Button.size() + this.margin;
  }
  display() {
    this.buttons.forEach((button) => {
      button.display();
    });
  }
  inside() {
    return Rect.inside(
      mouseX,
      mouseY,
      this.x,
      this.y,
      this.xPos - this.x,
      Button.size()
    );
  }
  mouseMoved() {
    this.buttons.forEach((button) => {
      button.mouseMoved();
    });
  }
  mousePressed() {
    this.buttons.forEach((button) => {
      button.mousePressed();
    });
  }
}
