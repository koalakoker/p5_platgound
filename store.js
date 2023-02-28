class Store {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }
  addState() {
    const state = Drawing.getInstance().serialize();
    this.history.push(state);
    this.currentIndex++;
  }
  moveToPreviousState() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    Drawing.getInstance().deserialize(this.history[this.currentIndex]);
  }
  moveToNextState() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
    }
    Drawing.getInstance().deserialize(this.history[this.currentIndex]);
  }
}

let store = new Store();
