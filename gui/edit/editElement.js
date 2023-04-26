class EditElement extends GElem {
  constructor(parent, x, y, w, h, text) {
    super(parent, x, y, w, h);
    this.margin = 4;
    this.setEditedText(text);
    this.cursor = new Cursor(this, this.h);

    this.shortCut = new ShortCut(new KeyState(""), (k) => {
      this.keyManager(k);
    });
    this.shortCutSh = new ShortCut(new KeyState("").addShift(), (k) => {
      this.shiftKeyManager(k);
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
    this.cursor.moveRight(newTxt.lenght);
  }
  backspace() {
    const txt = this.editedText();
    const pos = this.cursor.editPosition();
    this.setEditedText(txt.slice(0, pos - 1) + txt.slice(pos));
    this.cursor.moveLeft();
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
  keyManager(k) {
    const key = k.getKey();
    if (key !== "") {
      if (key.length === 1) {
        this.insertAtCursor(key);
      } else {
        const pos = this.cursor.editPosition();
        if (k.toString() === "ArrowRight") {
          if (pos < this.editedText().length) {
            this.cursor.moveRight();
          }
        } else if (k.toString() === "ArrowLeft") {
          if (pos > 0) {
            this.cursor.moveLeft();
          }
        } else if (k.toString() === "Backspace") {
          if (pos > 0) {
            this.backspace();
          }
        } else {
          console.log(key);
        }
      }
    }
  }
  shiftKeyManager(k) {
    const key = k.getKey();
    if (key !== "") {
      if (key.length === 1) {
        this.insertAtCursor(key);
      }
    }
  }
}
