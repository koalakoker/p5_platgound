let selectButton;
let addBar;
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
    lseBar.append(
      new PushButton("png/icons8-file-download-48.png", () => {
        drawing.deserialize();
      })
    );
    lseBar.append(
      new PushButton("png/icons8-salva-30.png", () => {
        drawing.serialize();
      })
    );
    this.mainBar.append(lseBar);

    // Add group
    addBar = new Group(() => {
      drawing.deSelectAll();
    });
    selectButton = new CheckButton("png/icons8-cursore-mano-25.png", (sel) => {
      const state = sel ? new StateSelect() : null;
      drawing.changeState(state);
    });
    addBar.append(selectButton);
    addBar.append(
      new CheckButton("png/addLine.png", (sel) => {
        const state = sel ? new StateAddLine() : null;
        drawing.changeState(state);
      })
    );
    addBar.append(
      new CheckButton("png/addRect.png", (sel) => {
        const state = sel ? new StateAddRect() : null;
        drawing.changeState(state);
      })
    );
    addBar.append(
      new CheckButton("png/addCircle.png", (sel) => {
        const state = sel ? new StateAddCircle() : null;
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
    const strokeColorPicker = new ColorPicker(
      255,
      (color) => {
        drawing.newElementStyle.strokeColor = color;
      },
      (transparent) => {
        drawing.newElementStyle.stroke = !transparent;
      }
    );
    pickBar.append(strokeColorPicker);
    pickBar.append(
      new LinePicker(1, (weight) => {
        drawing.newElementStyle.strokeWeight = weight;
      })
    );
    const fillColorPicker = new ColorPicker(
      0,
      (color) => {
        drawing.newElementStyle.fillColor = color;
      },
      (transparent) => {
        drawing.newElementStyle.fill = !transparent;
      }
    );
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
  keyPressed() {
    this.mainBar.keyPressed();
  }
}
