class Selection {
  constructor(parent) {
    this.parent = parent;
    this.setSelection(0, 0);
  }
  selection() {
    if (this.selStart < this.selStop)
      return { start: this.selStart, stop: this.selStop };
    else return { start: this.selStop, stop: this.selStart };
  }
  setSelection(start, stop) {
    this.selStart = start;
    this.selStop = stop;
  }
  extendSelectionRight(pos) {
    const nPos = pos || 1;
    this.selStop += nPos;
    const max = this.parent.editedText().length;
    if (this.selStop > max) {
      this.selStop = max;
    }
    if (this.extendSelectionCb) {
      this.extendSelectionCb(this.selStop);
    }
  }
  extendSelectionLeft(pos) {
    const nPos = pos || 1;
    this.selStop -= nPos;
    if (this.selStop < 0) {
      this.selStop = 0;
    }
    if (this.extendSelectionCb) {
      this.extendSelectionCb(this.selStop);
    }
  }
  registerExtendSelectionCb(extendSelectionCb) {
    this.extendSelectionCb = extendSelectionCb;
  }
  isSelectionActive() {
    return this.selStart !== this.selStop;
  }
}
