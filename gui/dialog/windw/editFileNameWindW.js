class EditFileNameWindW extends WindW {
  constructor(fileName) {
    super(250, 0, 0);
    this.h = this.margin * 6;
    this.fileName = fileName;
    this.sensibleRegions = [];
    this.createCloseButton();
    this.createEditFileName();
    this.createOkButton();
    this.createCancelButton();
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
      this.fileName,
      () => {
        this.reject("cancel");
        this.onClose();
      }
    );
    this.sensibleRegions.push(this.edit);
  }

  createOkButton() {
    this.okBtn = new TextWndButton(
      null,
      "Confirm",
      this.innerLeft() + this.margin,
      this.innerBottom() - this.margin,
      this.margin * 5,
      this.margin,
      (x, y) => {
        this.resolve();
        this.onClose();
      }
    );
    this.sensibleRegions.push(this.okBtn);
  }

  createCancelButton() {
    this.cancelBtn = new TextWndButton(
      null,
      "Cancel",
      this.innerRigth() - this.margin - this.margin * 5,
      this.innerBottom() - this.margin,
      this.margin * 5,
      this.margin,
      (x, y) => {
        this.reject("cancel");
        this.onClose();
      }
    );
    this.sensibleRegions.push(this.cancelBtn);
  }

  onClose() {
    this.edit.onClose();
    super.onClose();
  }
}
