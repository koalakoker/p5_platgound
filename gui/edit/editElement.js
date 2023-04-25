class EditElement extends GElem {
  constructor(parent, x, y, w, h, text) {
    super(parent, x, y, w, h);
    this.margin = 4;
    this.setEditedText(text);
    this.cursor = new Cursor(this, this.h);

    this.shortCut = new ShortCut(new KeyState(""), (k) => {
      const key = k.getKey();
      if (key !== "") {
        if (key.length === 1) {
          this.insertAtCursor(key);
          this.cursor.moveRight();
        } else {
          if (k.toString() === "ArrowRight") {
            if (this.cursor.editPosition() < this.editedText().length) {
              this.cursor.moveRight();
            }
          }
          if (k.toString() === "ArrowLeft") {
            if (this.cursor.editPosition() > 0) {
              this.cursor.moveLeft();
            }
          }
        }
      }
    });
    this.shortCutSh = new ShortCut(new KeyState("").addShift(), (k) => {
      const key = k.getKey();
      if (key !== "") {
        if (key.length === 1) {
          this.insertAtCursor(key);
          this.cursor.moveRight();
        }
      }
    });
  }
  editedText() {
    return this.text;
  }
  setEditedText(text) {
    this.text = text;
  }
  insertAtCursor(newTxt) {
    const txt = this.editedText();
    const pos = this.cursor.editPosition();
    this.setEditedText(txt.slice(0, pos) + newTxt + txt.slice(pos));
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
