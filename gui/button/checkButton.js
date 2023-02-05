class CheckButton extends Button {
  constructor(fileName, selectCallBack, deSelectCallBack) {
    super(fileName);
    this.selectCallBack = selectCallBack;
    this.deSelectCallBack = deSelectCallBack;
    this.selected = false;
  }
  mousePressed() {
    if (this.inside()) {
      this.fillColor = this.clickColor();
      this.clickDebounce = 5;
      if (!this.selected) {
        this.selected = true;
        if (this.selectCallBack) {
          this.selectCallBack();
        }
        return true;
      } else {
        this.selected = false;
        if (this.deSelectCallBack) {
          this.deSelectCallBack();
        }
      }
    }
    return false;
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
