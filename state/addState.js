class AddState extends State {
  constructor() {
    super();
    this.dragging = false;
  }
  mousePressed() {
    this.dragging = true;
  }
  mouseReleased() {
    if (this.dragging) {
      this.dragging = false;
      if (this.newElement) {
        drawing.drawElement.push(this.newElement);
        this.newElement = null;
      }
    }
  }
  mouseDragged() {}
}
