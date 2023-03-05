let sketch = function (p) {
  p.setup = function () {
    Drawing.getInstance().setup();
    Gui.getInstance().setup();
  };

  p.draw = function () {
    Drawing.getInstance().display();
    const gui = Gui.getInstance();
    gui.display();
  };

  p.preload = function () {
    const gui = Gui.getInstance();
    gui.preload();
  };

  p.mouseMoved = function () {
    const gui = Gui.getInstance();
    gui.mouseMoved();
  };

  p.mousePressed = function () {
    const gui = Gui.getInstance();
    if (gui.mousePressed() === false) {
      Drawing.getInstance().mousePressed();
    }
  };

  p.mouseReleased = function () {
    const gui = Gui.getInstance();
    gui.mouseReleased();
    Drawing.getInstance().mouseReleased();
  };

  p.mouseDragged = function () {
    const gui = Gui.getInstance();
    gui.mouseDragged();
    Drawing.getInstance().mouseDragged();
  };
};

const p5js = new p5(sketch);
