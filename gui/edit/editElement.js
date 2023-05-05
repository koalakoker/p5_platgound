class EditElement extends GElem {
  constructor(parent, x, y, w, h, text) {
    super(parent, x, y, w, h);
    this.margin = 4;
    this.setEditedText(text);
    this.cursor = new Cursor(this, this.h);
    this.selection = new Selection(this);

    this.cursor.registerSetEditPositionCb((pos) => {
      this.selection.setRange(pos, pos);
    });
    this.selection.registerExtendSelectionCb((pos) => {
      const pCb = this.cursor.setEditPositionCb;
      this.cursor.setEditPositionCb = null;
      this.cursor.setEditPosition(pos);
      this.cursor.setEditPositionCb = pCb;
    });

    this.shortCut = new ShortCut(new KeyState(""), (k) => {
      this.keyManager(k);
    });
    this.shortCutSh = new ShortCut(new KeyState("").addShift(), (k) => {
      this.shiftKeyManager(k);
    });
    this.shortCutMt = new ShortCut(new KeyState("").addMeta(), (k) => {
      this.metaKeyManager(k);
    });
    this.shortCutMtSh = new ShortCut(
      new KeyState("").addMeta().addShift(),
      (k) => {
        this.metaShiftKeyManager(k);
      }
    );
    this.shortCutCtrlC = new ShortCut(new KeyState("c").addMeta(), (k) => {
      this.copy();
    });
    this.shortCutCtrlX = new ShortCut(new KeyState("x").addMeta(), (k) => {
      this.cut();
    });
    this.shortCutCtrlV = new ShortCut(new KeyState("v").addMeta(), (k) => {
      this.paste();
    });

    this.mouseTrackDown = new MouseTracker("mousedown", (m) => {
      this.click(m.x, m.y);
    });
    this.mouseTrackMove = new MouseTracker("mousemove", (m) => {
      this.move(m.x, m.y);
    });
    this.mouseTrackUp = new MouseTracker("mouseup", (m) => {
      this.release(m.x, m.y);
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
    if (this.selection.isSelectionActive()) {
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
    return this.text.slice(0, this.selection.range().start);
  }
  stripSelection() {
    return this.text.slice(
      this.selection.range().start,
      this.selection.range().stop
    );
  }
  stripAfterSelection() {
    return this.text.slice(this.selection.range().stop);
  }

  onClose() {
    kl.detach(this.shortCut);
    kl.detach(this.shortCutSh);
    kl.detach(this.shortCutMt);
    kl.detach(this.shortCutMtSh);
    kl.detach(this.shortCutCtrlC);
    kl.detach(this.shortCutCtrlV);
    kl.detach(this.shortCutCtrlX);

    ml.detach(this.mouseTrackDown);
    ml.detach(this.mouseTrackMove);
    ml.detach(this.mouseTrackUp);
  }
  metaKeyManager(k) {
    if (k.toString() === "cmd+ArrowRight") {
      this.cursor.setEditPosition(this.editedText().length);
    }
    if (k.toString() === "cmd+ArrowLeft") {
      this.cursor.setEditPosition(0);
    }
  }
  metaShiftKeyManager(k) {
    if (k.toString() === "cmd+shift+ArrowRight") {
      this.selection.setRange(
        this.cursor.editPosition(),
        this.editedText().length
      );
    }
    if (k.toString() === "cmd+shift+ArrowLeft") {
      this.selection.setRange(0, this.cursor.editPosition());
    }
  }
  keyManager(k) {
    const key = k.getKey();
    if (key !== "") {
      if (key.length === 1) {
        this.insertAtCursor(key);
      } else {
        if (k.toString() === "ArrowRight") {
          this.cursor.moveRight();
        } else if (k.toString() === "ArrowLeft") {
          this.cursor.moveLeft();
        } else if (k.toString() === "Backspace") {
          this.backspace();
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
        if (k.getKey() === "ArrowRight") {
          this.selection.extendSelectionRight();
        } else if (k.getKey() === "ArrowLeft") {
          this.selection.extendSelectionLeft();
        }
      }
    }
  }

  insertAtCursor(newTxt) {
    const txt = this.editedText();
    const start = this.selection.range().start;
    const stop = this.selection.range().stop;
    this.setEditedText(txt.slice(0, start) + newTxt + txt.slice(stop));
    this.cursor.setEditPosition(start + newTxt.length);
  }
  backspace() {
    const txt = this.editedText();
    const start = this.selection.range().start;
    const stop = this.selection.range().stop;
    if (this.selection.isSelectionActive()) {
      this.setEditedText(txt.slice(0, start) + txt.slice(stop));
      this.cursor.setEditPosition(start);
    } else {
      const pos = this.cursor.editPosition();
      if (pos > 0) {
        this.setEditedText(txt.slice(0, pos - 1) + txt.slice(pos));
        this.cursor.moveLeft();
      }
    }
  }
  copy() {
    if (!this.selection.isSelectionActive()) return;
    const txt = this.editedText();
    const start = this.selection.range().start;
    const stop = this.selection.range().stop;
    navigator.clipboard.writeText(txt.slice(start, stop));
  }
  cut() {
    if (!this.selection.isSelectionActive()) return;
    const txt = this.editedText();
    const start = this.selection.range().start;
    const stop = this.selection.range().stop;
    navigator.clipboard.writeText(txt.slice(start, stop));
    this.setEditedText(txt.slice(0, start) + txt.slice(stop));
    this.cursor.setEditPosition(start);
  }
  async paste() {
    const clipboard = await navigator.clipboard.readText();
    const txt = this.editedText();
    const start = this.selection.range().start;
    const stop = this.selection.range().stop;
    this.setEditedText(txt.slice(0, start) + clipboard + txt.slice(stop));
    this.cursor.setEditPosition(start + clipboard.length);
  }

  click(x, y) {
    if (this.inside(x, y)) {
      const i = this.findNearEditPosition(x);
      this.cursor.setEditPosition(i);
      this.mouseDown = true;
      this.selStart = i;
    }
  }
  move(x) {
    if (this.mouseDown) {
      const selStop = this.findNearEditPosition(x);
      this.selection.setRange(this.selStart, selStop);
    }
  }
  release() {
    if (this.mouseDown) {
      this.mouseDown = false;
    }
  }

  findNearEditPosition(x) {
    const dx = x - this.getX();
    const txt = this.editedText();
    const absDelta = [];
    for (let i = 0; i < txt.length + 1; i++) {
      const subS = txt.slice(0, i);
      const aD = Math.abs(p5js.textWidth(subS) - dx);
      absDelta[i] = aD;
    }

    let min = Infinity;
    let index = -1;
    for (let i = 0; i < absDelta.length; i++) {
      if (absDelta[i] < min) {
        min = absDelta[i];
        index = i;
      }
    }
    return index;
  }
}
