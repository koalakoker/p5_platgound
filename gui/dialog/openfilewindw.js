class OpenFileWindW extends Dialog {
  constructor(w, h, c, files) {
    super();
    this.w = w;
    this.h = h;
    this.c = c;
    this.files = files;
    this.firstFileShown = 0;

    this.margin = 15;
    this.vSpacing = 5;
    this.textSize = 16;

    this.sensibleRegions = [];
    this.sensibleRegionIsValid = false;
    this.clicked = false;

    this.createCloseButton();
    this.createScrollDownButton();
    this.createScrollUpButton();
  }

  draw() {
    this.drawBorder();
    this.drawText();
    this.drawButtons();
  }
  drawBorder() {
    p5js.stroke(255);
    p5js.fill(this.c);
    p5js.rectMode(p5js.CENTER);
    p5js.rect(this.x, this.y, this.w, this.h);
    p5js.rectMode(p5js.CORNER);
  }
  drawText() {
    if (!this.sensibleRegionIsValid) {
      this.sensibleRegions = [];
      this.sensibleRegions.push(this.closeButton);
      this.sensibleRegions.push(this.scrollUpButton);
      this.sensibleRegions.push(this.scrollDownButton);
    }
    let scrollDown = false;
    let scrollUp = this.firstFileShown !== 0;
    const xMargin = this.innerleft();
    const yTextBottom = this.innerBottom();
    let yPos = this.innerTop();

    p5js.textSize(this.textSize);
    p5js.textAlign(p5js.LEFT, p5js.TOP);
    p5js.stroke(255);
    p5js.fill(255);
    for (let i = this.firstFileShown; i < this.files.length; i++) {
      const fileName = this.files[i].name;
      if (yPos < yTextBottom) {
        p5js.text(fileName, xMargin, yPos);
        const region = new GElem(
          null,
          xMargin,
          yPos,
          p5js.textWidth(fileName),
          this.textSize,
          () => {
            this.resolve(this.files[i].id);
            this.onClose();
          }
        );
        this.sensibleRegions.push(region);
        yPos += p5js.textSize() + this.vSpacing;
      } else {
        scrollDown = true;
      }
    }
    this.scrollDownButton.active = scrollDown;
    this.scrollUpButton.active = scrollUp;
    this.sensibleRegionIsValid = true;
  }
  drawButtons() {
    this.scrollUpButton.draw();
    this.scrollDownButton.draw();
    this.closeButton.draw();
  }

  createCloseButton() {
    this.closeButton = new WndButton(
      null,
      this.innerRigth(),
      this.top(),
      this.margin,
      this.margin,
      "CLOSE",
      (x, y) => {
        this.reject();
        this.onClose();
      }
    );
    this.closeButton.active = true;
  }
  createScrollUpButton() {
    this.scrollUpButton = new WndButton(
      null,
      this.innerRigth(),
      this.top() + this.margin,
      this.margin,
      this.margin,
      "UP",
      (x, y) => {
        this.firstFileShown--;
        this.sensibleRegionIsValid = false;
      }
    );
  }
  createScrollDownButton() {
    this.scrollDownButton = new WndButton(
      null,
      this.innerRigth(),
      this.innerBottom(),
      this.margin,
      this.margin,
      "DOWN",
      (x, y) => {
        this.firstFileShown++;
        this.sensibleRegionIsValid = false;
      }
    );
  }

  mousePressed(x, y) {
    let inside = false;
    this.sensibleRegions.forEach((element) => {
      if (element.inside(x, y) && element.active) {
        this.clicked = true;
        inside = true;
      }
    });
    return inside;
  }
  mouseReleased(x, y) {
    let inside = false;
    this.sensibleRegions.forEach((element) => {
      if (element.inside(x, y)) {
        inside = true;
        if (this.clicked) {
          element.activationFunction(x, y);
          this.clicked = false;
        }
      }
    });
    return inside;
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
  innerleft() {
    return this.left() + this.margin;
  }
  rigth() {
    return this.x + this.w / 2;
  }
  innerRigth() {
    return this.rigth() - this.margin;
  }
}
