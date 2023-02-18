class Subject {
  constructor(name) {
    this.name = name;
    this.observers = [];
  }
  attach(obs) {
    if (!this.isAttached(obs)) {
      this.observers.push(obs);
    }
  }
  detach(obs) {
    if (this.isAttached(obs)) {
      this.observers.splice(i, 1);
    }
  }
  notify(msg) {
    this.observers.forEach((obs) => {
      obs.update(msg);
    });
  }
  index(obs) {
    for (let i = 0; i < this.observers.length; i++) {
      if (this.observers[i] === obs) {
        return i;
      }
    }
    return undefined;
  }
  isAttached(obs) {
    return this.index(obs) ? true : false;
  }
}
