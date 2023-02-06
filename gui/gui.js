class Gui {
  constructor() {}
  setup() {
    // Bar
    this.mainBar = new Bar(1, 1);

    // LoadSaveErase
    const lseBar = new Bar();
    lseBar.append(
      new PushButton("png/icons8-clear-58.png", () => {
        drawing.clear();
      })
    );
    lseBar.append(new PushButton("png/icons8-file-download-48.png"));
    lseBar.append(new PushButton("png/icons8-salva-30.png"));
    this.mainBar.append(lseBar);

    // Add group
    const addBar = new Group();
    addBar.append(
      new CheckButton("png/addLine.png", (sel) => {
        const state = sel ? new stateAddLine(drawing.grid) : null;
        drawing.changeState(state);
      })
    );
    addBar.append(
      new CheckButton("png/addRect.png", (sel) => {
        const state = sel ? new stateAddRect(drawing.grid) : null;
        drawing.changeState(state);
      })
    );
    addBar.append(
      new CheckButton("png/addCircle.png", (sel) => {
        const state = sel ? new stateAddCircle(drawing.grid) : null;
        drawing.changeState(state);
      })
    );
    this.mainBar.append(addBar);

    // Grid
    const gridGroup = new Group();
    const gridButton = new CheckButton("png/grid.png", (sel) => {
      drawing.grid.active = sel;
    });
    gridButton.selected = true;
    gridGroup.append(gridButton);
    this.mainBar.append(gridGroup);

    // Picker
    const pickBar = new Group();
    const strokeColorPicker = new ColorPicker(255, (color) => {
      drawing.newElementStyle.strokeColor = color;
    });
    pickBar.append(strokeColorPicker);
    const fillColorPicker = new ColorPicker(0, (color) => {
      drawing.newElementStyle.fillColor = color;
    });
    pickBar.append(fillColorPicker);
    this.mainBar.append(pickBar);
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
    return this.mainBar.mousePressed();
  }
  mouseReleased() {
    this.mainBar.mouseReleased();
  }
  mouseDragged() {
    this.mainBar.mouseDragged();
  }
}
