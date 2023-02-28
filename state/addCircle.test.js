function addCircleTests() {
  it("Add circle state tests", () => {
    // TBR calling drawing setup
    Drawing.getInstance().setup();
    const sAddCircle = new StateAddCircle();
    mouseX = 400;
    mouseY = 300;
    sAddCircle.mousePressed();
    mouseX = 450;
    sAddCircle.mouseDragged();
    sAddCircle.mouseReleased();
  });
}
