class Group extends Bar {
  constructor(x, y) {
    super(x, y);
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
        return true;
      }
    }
    return false;
  }
}
