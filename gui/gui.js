class Gui {
  constructor() {
    this.bar = new Group(0, 0);

    let buttonAddLine = new Button(
      "png/addLine.png",
      () => {
        drawing.changeState(new stateAddLine(drawing.grid));
      },
      () => {
        drawing.changeState(null);
      }
    );
    this.bar.append(buttonAddLine);

    let buttonAddRect = new Button(
      "png/addRect.png",
      () => {
        drawing.changeState(new stateAddRect(drawing.grid));
      },
      () => {
        drawing.changeState(null);
      }
    );
    this.bar.append(buttonAddRect);

    let buttonAddCircle = new Button(
      "png/addCircle.png",
      () => {
        drawing.changeState(new stateAddCircle(drawing.grid));
      },
      () => {
        drawing.changeState(null);
      }
    );
    this.bar.append(buttonAddCircle);
  }
  preload() {
    this.bar.preload();
  }
  display() {
    this.bar.display();
  }
  inside() {
    return this.bar.inside();
  }
  mouseMoved() {
    this.bar.mouseMoved();
  }
  mousePressed() {
    this.bar.mousePressed();
  }
  mouseReleased() {
    this.bar.mouseReleased();
  }
}
