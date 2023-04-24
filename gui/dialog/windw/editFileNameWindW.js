class EditFileNameWindW extends WindW {
  constructor(fileName) {
    super(250, 0, 0);
    this.h = this.margin * 6;
    this.fileName = fileName;
    this.sensibleRegions = [];
    this.createCloseButton();
    this.createEditFileName();
    this.createOkButton();
  }
  draw() {
    super.draw();
  }

  createEditFileName() {
    this.edit = new EditElement(
      this,
      -100,
      -this.margin,
      200,
      this.textSize,
      this.fileName
    );
    this.sensibleRegions.push(this.edit);
  }

  createOkButton() {
    this.okBtn = new YesWndButton(
      null,
      this.innerLeft() + this.margin,
      this.innerBottom() - this.margin,
      this.margin * 4,
      this.margin
    );
    this.sensibleRegions.push(this.okBtn);
  }

  onClose() {
    this.edit.onClose();
    super.onClose();
  }
}
