let addBar;
const KEY_CTRL = 91;
const KEY_Z = 90;
class Gui {
  constructor() {
    this.dialogs = [];
  }
  static getInstance() {
    if (!Gui.instance) {
      Object.defineProperty(Gui, "instance", {
        value: new Gui(),
        writable: false,
        enumerable: true,
        configurable: false,
      });
    }
    return Gui.instance;
  }
  init() {
    // Bar
    this.mainBar = new DropDownBar(null, 1, 0);

    // LoadSaveErase
    const lseBar = new Bar(this.mainBar);
    lseBar.append(
      new PushButton(lseBar, "png/icons8-clear-58.png", () => {
        drawing.clear();
      })
    );
    lseBar.append(
      new PushButton(lseBar, "png/icons8-file-download-48.png", () => {
        drawing.load().catch(() => this.showBackendNotAvailableError());
      })
    );
    lseBar.append(
      new PushButton(lseBar, "png/icons8-salva-30.png", () => {
        drawing.save();
        this.showDialog("Sketch has been saved");
      })
    );
    lseBar.append(
      new PushButton(lseBar, "png/icons8-annulla-26.png", () => {
        store.moveToPreviousState();
      }).addShortCut(
        new ShortCut(new KeyState("z").addMeta(), (button) => {
          button.activate();
        })
      )
    );
    lseBar.append(
      new PushButton(lseBar, "png/icons8-right-2-50.png", () => {
        store.moveToNextState();
      }).addShortCut(
        new ShortCut(new KeyState("z").addMeta().addShift(), (button) => {
          button.activate();
        })
      )
    );
    this.mainBar.append(lseBar);

    // Add group
    addBar = new Group(this.mainBar, () => {
      drawing.deSelectAll();
    });
    addBar.append(
      new CheckButton(addBar, "png/addLine.png", (sel) => {
        const state = sel ? new StateAddLine() : new StateSelect();
        drawing.changeState(state);
      })
    );
    addBar.append(
      new CheckButton(addBar, "png/addRect.png", (sel) => {
        const state = sel ? new StateAddRect() : new StateSelect();
        drawing.changeState(state);
      })
    );
    addBar.append(
      new CheckButton(addBar, "png/addCircle.png", (sel) => {
        const state = sel ? new StateAddCircle() : new StateSelect();
        drawing.changeState(state);
      })
    );
    this.mainBar.append(addBar);

    // Grid
    const gridGroup = new Group(this.mainBar);
    const gridButton = new CheckButton(gridGroup, "png/grid.png", (sel) => {
      drawing.grid.active = sel;
    });
    gridButton.selected = true;
    gridGroup.append(gridButton);
    this.mainBar.append(gridGroup);

    // Picker
    const pickBar = new Group(this.mainBar);
    const strokeColorPicker = new ColorPicker(
      pickBar,
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
      new LinePicker(pickBar, 1, (weight) => {
        drawing.newElementStyle.strokeWeight = weight;
      })
    );
    const fillColorPicker = new ColorPicker(
      pickBar,
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
    this.init();
    this.mainBar.preload();
  }
  setup() {
    new Hints();
  }
  display() {
    this.mainBar.display();
    this.dialogs.forEach((dialog) => {
      dialog.draw();
    });
  }
  inside() {
    return this.mainBar.inside();
  }
  showDialog(text, textColor, duration) {
    duration ||= 3000;
    textColor ||= color(255);
    this.dialogs.push(
      new Message(
        text,
        duration,
        textColor,
        (dialog) => {
          this.removeDialog(dialog);
        },
        200,
        200
      )
    );
  }
  showBackendNotAvailableError() {
    this.showDialog("Backend not available at: " + url, color(255, 0, 0), 5000);
  }
  removeDialog(dialog) {
    const i = this.dialogs.indexOf(dialog);
    this.dialogs.splice(i, 1);
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
