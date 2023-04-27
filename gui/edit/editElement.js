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

  draw() {
    p5js.fill(0);
    p5js.stroke(255);
    p5js.rectMode(p5js.CORNER);
    p5js.rect(this.getX(), this.getY(), this.w, this.h);

    this.drawText();
    this.cursor.draw();
  }
  drawText() {
    p5js.textSize(this.textSize);
    p5js.textAlign(p5js.LEFT, p5js.TOP);
    p5js.stroke(255);
    p5js.fill(255);
    if (this.cursor.isSelectionActive()) {
      const before = this.stripBeforeSelection();
      const selection = this.stripSelection();
      const after = this.stripAfterSelection();

      p5js.text(before, this.getX(), this.getY());
      p5js.stroke(255, 0, 0);
      p5js.fill(255, 0, 0);
      p5js.text(selection, this.getX() + p5js.textWidth(before), this.getY());
      p5js.stroke(255);
      p5js.fill(255);
      p5js.text(
        after,
        this.getX() + p5js.textWidth(before) + p5js.textWidth(selection),
        this.getY()
      );
    } else {
      p5js.text(this.text, this.getX(), this.getY());
    }
  }
  stripBeforeSelection() {
    return this.text.slice(0, this.cursor.editPosition().start);
  }
  stripSelection() {
    return this.text.slice(
      this.cursor.editPosition().start,
      this.cursor.editPosition().stop
    );
  }
  stripAfterSelection() {
    return this.text.slice(this.cursor.editPosition().stop);
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
        const start = this.cursor.editPosition().start;
        const stop = this.cursor.editPosition().stop;
        if (k.toString() === "ArrowRight") {
          if (stop < this.editedText().length) {
            this.cursor.moveRight();
          }
        } else if (k.toString() === "ArrowLeft") {
          if (start > 0) {
            this.cursor.moveLeft();
          }
        } else if (k.toString() === "Backspace") {
          if (start > 0) {
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
      } else {
        const start = this.cursor.editPosition().start;
        const stop = this.cursor.editPosition().stop;
        if (k.getKey() === "ArrowRight") {
          if (stop < this.editedText().length) {
            this.cursor.extendSelectionRight();
          }
        } else if (k.getKey() === "ArrowLeft") {
          if (start > 0) {
            this.cursor.extendSelectionLeft();
          }
        }
      }
    }
  }
  insertAtCursor(newTxt) {
    const txt = this.editedText();
    const start = this.cursor.editPosition().start;
    const stop = this.cursor.editPosition().stop;
    this.setEditedText(txt.slice(0, start) + newTxt + txt.slice(stop));
    this.cursor.setEditPosition(start + newTxt.length);
    this.cursor.selectionActive(false);
  }
  backspace() {
    const txt = this.editedText();
    const start = this.cursor.editPosition().start;
    const stop = this.cursor.editPosition().stop;
    if (this.cursor.isSelectionActive()) {
      this.setEditedText(txt.slice(0, start) + txt.slice(stop));
      this.cursor.setEditPosition(start);
      this.cursor.selectionActive(false);
    } else {
      this.setEditedText(txt.slice(0, start - 1) + txt.slice(start));
      this.cursor.moveLeft();
    }
  }
}
