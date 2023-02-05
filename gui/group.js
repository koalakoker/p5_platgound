class Group extends Bar {
  constructor(x, y) {
    super(x, y);
  }
  mousePressed() {
    this.elements.forEach((button) => {
      if (button.mousePressed()) {
        if (this.selected !== button) {
          if (this.selected) {
            this.selected.selected = false;
          }
          this.selected = button;
        }
      }
    });
  }
}
