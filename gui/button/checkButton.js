class CheckButton extends Button {
  constructor(fileName, cbSelChange) {
    super(fileName);
    this.cbSelChange = cbSelChange;
    this.selected = false;
  }
  mousePressed() {
    let retVal = false;
    if (this.inside()) {
      this.fillColor = this.clickColor();
      this.clickDebounce = 5;

      this.selected = !this.selected;
      retVal = this.selected;

      if (this.cbSelChange) {
        this.cbSelChange(this.selected);
      }
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
