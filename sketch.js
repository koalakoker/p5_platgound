let sketch = function (p) {
  p.setup = function () {
    Drawing.getInstance().setup();
    Gui.getInstance().setup();
  };

  p.draw = function () {
    window.deltaTime = p.deltaTime;
    const drawing = Drawing.getInstance();
    drawing.display();
    const gui = Gui.getInstance();
    gui.display();
  };

  p.preload = function () {
    const gui = Gui.getInstance();
    gui.preload();
  };

  p.mouseMoved = function () {
    const gui = Gui.getInstance();
    gui.mouseMoved(p5js.mouseX, p5js.mouseY);
  };

  p.mousePressed = function () {
    const gui = Gui.getInstance();
    if (gui.mousePressed(p5js.mouseX, p5js.mouseY) === false) {
      const drawing = Drawing.getInstance();
      drawing.mousePressed(p5js.mouseX, p5js.mouseY);
    }
  };

  p.mouseReleased = function () {
    const gui = Gui.getInstance();
    gui.mouseReleased(p5js.mouseX, p5js.mouseY);

    const drawing = Drawing.getInstance();
    drawing.mouseReleased(p5js.mouseX, p5js.mouseY);
  };

  p.mouseDragged = function () {
    const gui = Gui.getInstance();
    gui.mouseDragged(p5js.mouseX, p5js.mouseY);

    const drawing = Drawing.getInstance();
    drawing.mouseDragged(p5js.mouseX, p5js.mouseY);
  };
};

const p5js = new p5(sketch);
window.deltaTime = p5js.deltaTime;
