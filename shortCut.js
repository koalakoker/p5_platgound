class ShortCut extends Observer {
  constructor(name) {
    super(name);
  }
  update(msg) {
    console.log(this.name, msg);
  }
}
