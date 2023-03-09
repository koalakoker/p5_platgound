class CheckButton extends Button {
  constructor(parent, fileName, cbSelChange) {
    super(parent, fileName);
    this.cbSelChange = cbSelChange;
    this.selected = false;
  }
  click(sel, cbExec) {
    if (sel) {
      this.fillColor = this.clickColor();
    }
    this.clickDebounce = 5;
    this.selected = sel;
    if (this.cbSelChange && cbExec) {
      this.cbSelChange(this.selected);
    }
  }
  mousePressed(x, y) {
    let retVal = false;
    if (this.inside(x, y)) {
      this.click(!this.selected, true);
      retVal = this.selected;
    }
    return retVal;
  }
  normalColor() {
    return this.selected ? this.selectedColor() : this.unSelectedColor();
  }
  overColor() {
    return this.selected
      ? this.selectedOverColor()
      : this.unSelectedOverColor();
  }
}
