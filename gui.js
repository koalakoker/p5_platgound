class Gui {
  constructor() {
    this.diagMngr = new DiagManager();
    this.windwMngr = new WindwManager();
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
        Drawing.getInstance().clear();
      })
    );
    lseBar.append(
      new PushButton(lseBar, "png/icons8-file-download-48.png", () => {
        Drawing.getInstance().load();
      })
    );
    lseBar.append(
      new PushButton(lseBar, "png/icons8-salva-30.png", () => {
        Drawing.getInstance().save();
      })
    );
    lseBar.append(
      new PushButton(lseBar, "png/icons8-annulla-26.png", () => {
        Store.getInstance().moveToPreviousState();
      }).addShortCut(
        new ShortCut(new KeyState("z").addMeta(), (button) => {
          button.click();
        })
      )
    );
    lseBar.append(
      new PushButton(lseBar, "png/icons8-right-2-50.png", () => {
        Store.getInstance().moveToNextState();
      }).addShortCut(
        new ShortCut(new KeyState("z").addMeta().addShift(), (button) => {
          button.click();
        })
      )
    );
    this.mainBar.append(lseBar);

    // Add group
    this.addBar = new Group(this.mainBar, () => {
      Drawing.getInstance().deSelectAll();
    });
    this.addBar.append(
      new CheckButton(this.addBar, "png/addLine.png", (sel) => {
        const state = sel ? new StateAddLine() : new StateSelect();
        Drawing.getInstance().changeState(state);
      })
    );
    this.addBar.append(
      new CheckButton(this.addBar, "png/addRect.png", (sel) => {
        const state = sel ? new StateAddRect() : new StateSelect();
        Drawing.getInstance().changeState(state);
      })
    );
    this.addBar.append(
      new CheckButton(this.addBar, "png/addCircle.png", (sel) => {
        const state = sel ? new StateAddCircle() : new StateSelect();
        Drawing.getInstance().changeState(state);
      })
    );
    this.mainBar.append(this.addBar);

    // Grid
    const gridGroup = new Group(this.mainBar);
    const gridButton = new CheckButton(gridGroup, "png/grid.png", (sel) => {
      Drawing.getInstance().grid.active = sel;
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
        Drawing.getInstance().newElementStyle.strokeColor = color;
      },
      (transparent) => {
        Drawing.getInstance().newElementStyle.stroke = !transparent;
      }
    );
    pickBar.append(strokeColorPicker);
    pickBar.append(
      new LinePicker(pickBar, 1, (weight) => {
        Drawing.getInstance().newElementStyle.strokeWeight = weight;
      })
    );
    const fillColorPicker = new ColorPickerAlpha(
      pickBar,
      p5js.color(0, 0, 0, 255),
      (color) => {
        Drawing.getInstance().newElementStyle.fillColor = color;
      },
      (transparent) => {
        Drawing.getInstance().newElementStyle.fill = !transparent;
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
    this.windwMngr.draw();
    this.diagMngr.draw();
  }

  addMessage(msg) {
    return this.diagMngr.addMessage(msg);
  }
  showBackendNotAvailableError() {
    return this.diagMngr.addError("Backend not available at: " + url);
  }
  addWindw(w) {
    return this.windwMngr.addWindw(w);
  }

  resetAddBar() {
    this.addBar.changeSelection(null, false);
  }

  mouseMoved(x, y) {
    this.mainBar.mouseMoved(x, y);
  }
  mousePressed(x, y) {
    if (this.diagMngr.mousePressed(x, y)) return true;
    if (this.windwMngr.mousePressed(x, y)) return true;
    return this.mainBar.mousePressed(x, y);
  }
  mouseReleased(x, y) {
    if (this.diagMngr.mouseReleased(x, y)) return;
    if (this.windwMngr.mouseReleased(x, y)) return;
    this.mainBar.mouseReleased(x, y);
  }
  mouseDragged(x, y) {
    this.mainBar.mouseDragged(x, y);
  }
}
