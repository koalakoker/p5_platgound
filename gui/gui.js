class Gui {
  constructor() {
    this.elements = [];
    let addBar = new Group(0, 0);

    addBar.append(
      new CheckButton(
        "png/addLine.png",
        () => {
          drawing.changeState(new stateAddLine(drawing.grid));
        },
        () => {
          drawing.changeState(null);
        }
      )
    );

    addBar.append(
      new CheckButton(
        "png/addRect.png",
        () => {
          drawing.changeState(new stateAddRect(drawing.grid));
        },
        () => {
          drawing.changeState(null);
        }
      )
    );

    addBar.append(
      new CheckButton(
        "png/addCircle.png",
        () => {
          drawing.changeState(new stateAddCircle(drawing.grid));
        },
        () => {
          drawing.changeState(null);
        }
      )
    );
    this.elements.push(addBar);

    let gridGroup = new Group(addBar.size(), 0);
    gridGroup.append(new CheckButton("png/grid.png"));
    this.elements.push(gridGroup);
  }
  preload() {
    this.elements.forEach((element) => {
      element.preload();
    });
  }
  display() {
    this.elements.forEach((element) => {
      element.display();
    });
  }
  inside() {
    let inside = false;
    this.elements.forEach((element) => {
      inside = inside || element.inside();
    });
    return inside;
  }
  mouseMoved() {
    this.elements.forEach((element) => {
      element.mouseMoved();
    });
  }
  mousePressed() {
    this.elements.forEach((element) => {
      element.mousePressed();
    });
  }
  mouseReleased() {
    this.elements.forEach((element) => {
      element.mouseReleased();
    });
  }
}
