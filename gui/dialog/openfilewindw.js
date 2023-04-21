class OpenFileWindW extends WindW {
  constructor(w, h, c, files) {
    super(w, h, c);
    this.files = files;
    this.firstFileShown = 0;

    this.sensibleRegionIsValid = false;
    this.clicked = false;

    this.createScrollDownButton();
    this.createScrollUpButton();
  }

  draw() {
    super.draw();
    this.drawText();
  }

  drawText() {
    if (!this.sensibleRegionIsValid) {
      this.sensibleRegions = [];
      this.sensibleRegions.push(this.closeButton);
      this.sensibleRegions.push(this.scrollUpButton);
      this.sensibleRegions.push(this.scrollDownButton);
    }
    let scrollDown = false;
    let scrollUp = this.firstFileShown !== 0;
    const xPos = this.innerleft();
    const yTextBottom = this.innerBottom();
    let yPos = this.innerTop();

    p5js.textSize(this.textSize);
    p5js.textAlign(p5js.LEFT, p5js.TOP);
    p5js.stroke(255);
    p5js.fill(255);
    for (let i = this.firstFileShown; i < this.files.length; i++) {
      const fileName = this.files[i].name;
      if (yPos < yTextBottom) {
        const textXpos = xPos + (this.margin + 3) * 2;
        p5js.text(fileName, textXpos, yPos);
        if (!this.sensibleRegionIsValid) {
          const region = new GElem(
            null,
            textXpos,
            yPos,
            p5js.textWidth(fileName),
            this.textSize,
            () => {
              this.resolve(this.files[i].id);
              this.onClose();
            }
          );
          this.sensibleRegions.push(region);

          this.sensibleRegions.push(
            new WndButton(
              null,
              xPos + this.margin + 3,
              yPos,
              this.margin,
              this.margin,
              "CLOSE",
              async () => {
                await removeFile(this.files[i].id);
                this.files = await getFiles();
                this.sensibleRegionIsValid = false;
              }
            )
          );

          this.sensibleRegions.push(
            new WndButton(null, xPos, yPos, this.margin, this.margin, "EDIT")
          );
        }

        yPos += p5js.textSize() + this.vSpacing;
      } else {
        scrollDown = true;
      }
    }
    this.scrollDownButton.active = scrollDown;
    this.scrollUpButton.active = scrollUp;
    this.sensibleRegionIsValid = true;
  }

  createScrollUpButton() {
    this.scrollUpButton = new WndButton(
      null,
      this.innerRigth(),
      this.top() + this.margin,
      this.margin,
      this.margin,
      "UP",
      (x, y) => {
        this.firstFileShown--;
        this.sensibleRegionIsValid = false;
      }
    );
  }
  createScrollDownButton() {
    this.scrollDownButton = new WndButton(
      null,
      this.innerRigth(),
      this.innerBottom(),
      this.margin,
      this.margin,
      "DOWN",
      (x, y) => {
        this.firstFileShown++;
        this.sensibleRegionIsValid = false;
      }
    );
  }
}
