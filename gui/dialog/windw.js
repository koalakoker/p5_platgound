class WindW extends Dialog {
  constructor(w, h, c, fileNames) {
    super();
    this.w = w;
    this.h = h;
    this.c = c;
    this.fileNames = fileNames;
  }
  draw() {
    p5js.stroke(255);
    p5js.fill(this.c);
    p5js.rectMode(p5js.CENTER);
    p5js.rect(this.x, this.y, this.w, this.h);
    p5js.rectMode(p5js.CORNER);
    const margin = 15;
    const vSpacing = 5;
    const xMargin = this.x - this.w / 2 + margin;
    let yPos = this.y - this.h / 2 + margin;

    p5js.textSize(16);
    p5js.textAlign(p5js.LEFT, p5js.TOP);
    p5js.stroke(255);
    p5js.fill(255);
    this.fileNames.forEach((str) => {
      p5js.text(str, xMargin, yPos);
      yPos += p5js.textSize() + vSpacing;
    });
  }
}
