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
    p5js.text(this.message, this.x, this.y);
  }
  createYesButton() {
    this.sensibleRegions.push(
      new WndButton(
        null,
        this.innerLeft() + this.margin,
        this.innerBottom() - this.margin,
        this.margin * 4,
        this.margin,
        "YES",
        (x, y) => {
          this.resolve("yes");
          this.onClose();
        }
      )
    );
  }
  createNoButton() {
    this.sensibleRegions.push(
      new WndButton(
        null,
        this.innerRigth() - this.margin * 5,
        this.innerBottom() - this.margin,
        this.margin * 4,
        this.margin,
        "NO",
        (x, y) => {
          this.reject("cancel");
          this.onClose();
        }
      )
    );
  }
}
