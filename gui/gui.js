class Gui {
  constructor() {
    // Bar
    this.mainBar = new Bar();

    // LoadSaveErase
    const lseBar = new Bar();
    lseBar.append(new PushButton("png/icons8-clear-58.png"));
    lseBar.append(new PushButton("png/icons8-file-download-48.png"));
    lseBar.append(new PushButton("png/icons8-salva-30.png"));
    this.mainBar.append(lseBar);

    // Add group
    const addBar = new Group();
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
    this.mainBar.append(addBar);

    // Grid
    const gridGroup = new Group();
    const gridButton = new CheckButton(
      "png/grid.png",
      () => {
        drawing.grid.active = !drawing.grid.active;
      },
      () => {
        drawing.grid.active = !drawing.grid.active;
      }
    );
    gridButton.selected = true;
    gridGroup.append(gridButton);
    this.mainBar.append(gridGroup);
  }
  preload() {
    this.mainBar.preload();
  }
  display() {
    this.mainBar.display();
  }
  inside() {
    return this.mainBar.inside();
  }
  mouseMoved() {
    this.mainBar.mouseMoved();
  }
  mousePressed() {
    this.mainBar.mousePressed();
  }
  mouseReleased() {
    this.mainBar.mousePressed();
  }
}
