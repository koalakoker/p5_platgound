class Observer {
  constructor(name, cbUpdate) {
    this.name = name;
    this.cbUpdate = cbUpdate;
  }
  update(msg) {
    if (this.cbUpdate) {
      this.cbUpdate(msg);
    }
  }
}
