class StateSelect extends State {
  constructor() {
    super();
  }
  draw() {}
  mousePressed() {
    console.log(drawing.elementsAtPoint(mouseX, mouseY));
  }
  mouseReleased() {}
  mouseDragged() {}
}
