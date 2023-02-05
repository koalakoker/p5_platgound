class Group {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.margin = 3;
    this.buttons = [];
    this.xPos = this.x;
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
  size() {
    return this.xPos - this.x;
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
      if (button.mousePressed()) {
        if (this.selected !== button) {
          if (this.selected) {
            this.selected.selected = false;
          }
          this.selected = button;
        }
      }
    });
  }
  mouseReleased() {
    this.buttons.forEach((button) => {
      button.mouseReleased();
    });
  }
}
