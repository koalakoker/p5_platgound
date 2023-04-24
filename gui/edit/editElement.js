class EditElement extends GElem {
  constructor(parent, x, y, w, h, text) {
    super(parent, x, y, w, h);
    this.margin = 4;
    this.setEditedText(text);
    this.cursor = new Cursor(this, this.h);
  }
  editedText() {
    return this.text;
  }
  setEditedText(text) {
    this.text = text;
  }
  draw() {
    p5js.fill(0);
    p5js.stroke(255);
    p5js.rectMode(p5js.CORNER);
    p5js.rect(this.getX(), this.getY(), this.w, this.h);

    p5js.textSize(this.textSize);
    p5js.textAlign(p5js.LEFT, p5js.TOP);
    p5js.stroke(255);
    p5js.fill(255);
    p5js.text(this.text, this.getX(), this.getY());

    this.cursor.draw();
  }
  onClose() {
    this.cursor.detach();
  }
}
