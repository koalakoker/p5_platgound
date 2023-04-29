class MouseLogger extends Subject {
  constructor() {
    super();
    this.mouseState = new MouseState();
  }
  setState(mouseState) {
    this.mouseState = mouseState;
    this.notify(mouseState);
  }
  getState() {
    return this.mouseState;
  }
}

ml = new MouseLogger();
window.addEventListener("mousedown", (event) => {
  //console.log(event);
  const ms = new MouseState(event.type, event.x, event.y);
  ml.setState(ms);
});
window.addEventListener("mouseup", (event) => {
  //console.log(event);
  ml.setState(new MouseState(event.type, event.x, event.y));
});
window.addEventListener("mousemove", (event) => {
  //console.log(event);
  ml.setState(new MouseState(event.type, event.x, event.y));
});
