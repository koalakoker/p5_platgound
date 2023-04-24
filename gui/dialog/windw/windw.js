class WindW extends Dialog {
  constructor(w, h, c) {
    super();
    this.w = w;
    this.h = h;
    this.c = c;

    this.margin = 15;
    this.vSpacing = 5;
    this.textSize = 16;

    this.sensibleRegions = [];
    this.clicked = false;

    this.createCloseButton();
  }

  draw() {
    this.drawBorder();
    this.drawButtons();
  }
  drawBorder() {
    p5js.stroke(255);
    p5js.fill(this.c);
    p5js.rectMode(p5js.CENTER);
    p5js.rect(this.x, this.y, this.w, this.h);
    p5js.rectMode(p5js.CORNER);
  }
  drawButtons() {
    this.sensibleRegions.forEach((element) => {
      if (element.draw) {
        element.draw();
      }
    });
  }

  createCloseButton() {
    this.closeButton = new CloseWndButton(
      null,
      this.innerRigth(),
      this.top(),
      this.margin,
      this.margin,
      (x, y) => {
        this.reject("cancel");
        this.onClose();
      }
    );
    this.sensibleRegions.push(this.closeButton);
  }

  mousePressed(x, y) {
    let inside = false;
    this.sensibleRegions.forEach((element) => {
      if (element.inside(x, y) && element.active) {
        this.clicked = true;
        inside = true;
        element.mousePressed();
      }
    });
    return inside;
  }
  mouseReleased(x, y) {
    let inside = false;
    this.sensibleRegions.forEach(async (element) => {
      if (element.inside(x, y)) {
        inside = true;
        if (this.clicked) {
          if (element.debounce) {
            await element.debounce();
          }
          if (element.activationFunction) {
            element.activationFunction(x, y);
          }
          this.clicked = false;
          element.mouseReleased();
        }
      }
    });
    return inside;
  }

  registerCloseCb(cb) {
    this.onCloseCb = cb;
  }

  onClose() {
    if (this.onCloseCb) {
      this.onCloseCb();
    }
  }

  top() {
    return this.y - this.h / 2;
  }
  innerTop() {
    return this.top() + this.margin;
  }
  bottom() {
    return this.y + this.h / 2;
  }
  innerBottom() {
    return this.bottom() - this.margin;
  }
  left() {
    return this.x - this.w / 2;
  }
  innerLeft() {
    return this.left() + this.margin;
  }
  rigth() {
    return this.x + this.w / 2;
  }
  innerRigth() {
    return this.rigth() - this.margin;
  }
}
