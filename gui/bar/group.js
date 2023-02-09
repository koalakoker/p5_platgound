class Group extends Bar {
  constructor(cbSelectionChange, x, y) {
    super(x, y);
    this.cbSelectionChange = cbSelectionChange;
  }
  mousePressed() {
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      if (element.mousePressed()) {
        if (this.selected !== element) {
          if (this.selected) {
            this.selected.selected = false;
          }
          this.selected = element;
        }
        if (this.cbSelectionChange) {
          this.cbSelectionChange();
        }
        return true;
      }
    }
    return false;
  }
}
