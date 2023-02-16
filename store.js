class Store {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }
  addState() {
    const state = drawing.serialize();
    this.history.push(state);
    this.currentIndex++;
  }
  moveToPreviousState() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    drawing.deserialize(this.history[this.currentIndex]);
  }
  moveToNextState() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
    }
    drawing.deserialize(this.history[this.currentIndex]);
  }
}
