class WindW extends Dialog {
  constructor(w, h, c, fileNames) {
    super();
    this.w = w;
    this.h = h;
    this.c = c;
    this.fileNames = fileNames;

    this.margin = 15;
    this.vSpacing = 5;
    this.textSize = 16;

    this.sensibleRegions = [];
    this.clicked = false;
  }

  draw() {
    this.drawBorder();

    if (this.drawText()) {
      this.drawScrollButtons();
    }
  }
  drawBorder() {
    p5js.stroke(255);
    p5js.fill(this.c);
    p5js.rectMode(p5js.CENTER);
    p5js.rect(this.x, this.y, this.w, this.h);
    p5js.rectMode(p5js.CORNER);
  }
  drawText() {
    const xMargin = this.innerleft();
    const yTextBottom = this.innerBottom();
    let yPos = this.innerTop();

    p5js.textSize(this.textSize);
    p5js.textAlign(p5js.LEFT, p5js.TOP);
    p5js.stroke(255);
    p5js.fill(255);
    let scroll = false;
    this.fileNames.forEach((str) => {
      if (yPos < yTextBottom) {
        p5js.text(str, xMargin, yPos);
        yPos += p5js.textSize() + this.vSpacing;
      } else {
        scroll = true;
      }
    });
    return scroll;
  }
  drawScrollButtons() {
    p5js.stroke(255);
    p5js.fill(255);
    p5js.rect(this.innerRigth(), this.top(), this.margin, this.margin);
    this.sensibleRegions.push(
      new GElem(
        null,
        this.innerRigth(),
        this.top(),
        this.margin,
        this.margin,
        (x, y) => {
          console.log(x, y);
        }
      )
    );
    p5js.rect(this.innerRigth(), this.innerBottom(), this.margin, this.margin);

    p5js.stroke(0);
    p5js.fill(0);
    const trMargin = 3;

    p5js.beginShape();
    p5js.vertex(this.innerRigth() + this.margin / 2, this.top() + trMargin);
    p5js.vertex(this.rigth() - trMargin, this.innerTop() - trMargin);
    p5js.vertex(this.innerRigth() + trMargin, this.innerTop() - trMargin);
    p5js.endShape();

    p5js.beginShape();
    p5js.vertex(this.innerRigth() + this.margin / 2, this.bottom() - trMargin);
    p5js.vertex(this.rigth() - trMargin, this.innerBottom() + trMargin);
    p5js.vertex(this.innerRigth() + trMargin, this.innerBottom() + trMargin);
    p5js.endShape();
  }

  mousePressed(x, y) {
    let inside = false;
    this.sensibleRegions.forEach((element) => {
      if (element.inside(x, y)) {
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
