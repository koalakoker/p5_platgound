class Observer {
  constructor(cbUpdate) {
    this.cbUpdate = cbUpdate;
  }
  update(msg) {
    if (this.cbUpdate) {
      this.cbUpdate(msg);
    }
  }
}
