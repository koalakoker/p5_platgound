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
    const xPos = this.innerLeft();
    const yTextBottom = this.innerBottom();
    let yPos = this.innerTop();

    p5js.textSize(this.textSize);
    p5js.textAlign(p5js.LEFT, p5js.TOP);
    p5js.stroke(255);
    p5js.fill(255);
    for (let i = this.firstFileShown; i < this.files.length; i++) {
      const fileName = this.files[i].name;
      const fileId = this.files[i].id;
      if (yPos < yTextBottom) {
        const textXpos = xPos + (this.margin + this.vSpacing) * 2;
        p5js.text(fileName, textXpos, yPos);
        if (!this.sensibleRegionIsValid) {
          this.sensibleRegions.push(
            new GElem(
              null,
              textXpos,
              yPos,
              p5js.textWidth(fileName),
              this.textSize,
              () => {
                this.resolve(fileId);
                this.onClose();
              }
            )
          );

          this.sensibleRegions.push(
            new CloseWndButton(
              null,
              xPos + this.margin + this.vSpacing,
              yPos,
              this.margin,
              this.margin,
              async () => {
                try {
                  const confirm = await Gui.getInstance().addWindw(
                    new ConfirmWindW("Do you confirm delete of the drawing?")
                  );
                } catch (message) {
                  if (message === "cancel") return;
                  console.log(message);
                  return;
                }
                await removeFile(fileId);
                this.files = await getFiles();
                this.sensibleRegionIsValid = false;
              }
            )
          );

          this.sensibleRegions.push(
            new EditWndButton(null, xPos, yPos, this.margin, this.margin)
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
    this.scrollUpButton = new UpWndButton(
      null,
      this.innerRigth(),
      this.top() + this.margin,
      this.margin,
      this.margin,
      (x, y) => {
        this.firstFileShown--;
        this.sensibleRegionIsValid = false;
      }
    );
  }
  createScrollDownButton() {
    this.scrollDownButton = new DownWndButton(
      null,
      this.innerRigth(),
      this.innerBottom(),
      this.margin,
      this.margin,
      (x, y) => {
        this.firstFileShown++;
        this.sensibleRegionIsValid = false;
      }
    );
  }
}
