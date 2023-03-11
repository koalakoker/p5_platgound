class CheckButton extends Button {
  constructor(parent, fileName, cbSelChange) {
    super(parent, fileName);
    this.cbSelChange = cbSelChange;
    this.selected = false;
  }
  click(newCheckState, debounceMilliseconds) {
    if (newCheckState) {
      this.fillColor = this.clickColor();
    }
    this.selected = newCheckState;
    if (this.cbSelChange) {
      this.cbSelChange(this.selected);
    }
    return super.click(debounceMilliseconds);
  }
  mousePressed(x, y) {
    let retVal = false;
    if (this.inside(x, y)) {
      this.click(!this.selected);
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
