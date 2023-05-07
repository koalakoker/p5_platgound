class ConfirmWindW extends WindW {
  constructor(message) {
    super(200, 200, 0);
    p5js.textSize(this.textSize);
    const w = p5js.textWidth(message) + this.margin * 2;
    const h = this.textSize + this.margin * 5;
    this.w = w;
    this.h = h;
    this.sensibleRegions = [];
    this.createCloseButton();
    this.createYesButton();
    this.createNoButton();
    this.message = message;
  }
  draw() {
    super.draw();
    p5js.textSize(this.textSize);
    p5js.textAlign(p5js.CENTER, p5js.CENTER);
    p5js.stroke(255);
    p5js.fill(255);
    p5js.text(this.message, this.x, this.y - this.margin / 2);
  }
  createYesButton() {
    this.sensibleRegions.push(
      new TextWndButton(
        null,
        "Yes",
        this.innerLeft() + this.margin,
        this.innerBottom() - this.margin,
        this.margin * 4,
        this.margin,
        (x, y) => {
          this.resolve("yes");
          this.onClose();
        }
      )
    );
  }
  createNoButton() {
    this.sensibleRegions.push(
      new TextWndButton(
        null,
        "No",
        this.innerRigth() - this.margin * 5,
        this.innerBottom() - this.margin,
        this.margin * 4,
        this.margin,
        (x, y) => {
          this.reject("cancel");
          this.onClose();
        }
      )
    );
  }
}
