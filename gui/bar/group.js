class Group extends Bar {
  constructor(parent, cbSelectionChange, x, y) {
    super(parent, x, y);
    this.selected = null;
    this.cbSelectionChange = cbSelectionChange;
  }
  mousePressed() {
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      if (element.mousePressed()) {
        this.changeSelection(element);
        return true;
      }
    }
    return false;
  }
  changeSelection(element, click) {
    if (click) {
      element.click(true, true);
    }
    if (this.selected !== element) {
      if (this.selected) {
        if (this.selected.click) {
          this.selected.click(false, false);
        } else {
          this.selected.selected = false;
        }
      }
      this.selected = element;
    }
    if (this.cbSelectionChange) {
      this.cbSelectionChange();
    }
  }
}
