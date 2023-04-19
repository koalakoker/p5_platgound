let rSlider;
let gSlider;
let bSlider;
let aSlider;

class ColorPickerAlpha extends Picker {
  constructor(parent, color, cbColorChanged, x, y) {
    super(parent, x, y);
    this.color_ = color;
    this.cbColorChanged = cbColorChanged;
    this.initSliders(color);
    this.constructSlidersHandlers();
  }
  constructSlidersHandlers() {
    rSlider = {
      i: 0,
      get: (c) => {
        return p5js.red(c);
      },
    };
    gSlider = {
      i: 1,
      get: (c) => {
        return p5js.green(c);
      },
    };
    bSlider = {
      i: 2,
      get: (c) => {
        return p5js.blue(c);
      },
    };
    aSlider = {
      i: 3,
      get: (c) => {
        return p5js.alpha(c);
      },
    };
  }
  setColor(color, cbExec) {
    this.color_ = color;
    if (cbExec === undefined) {
      cbExec = true;
    }
    if (this.cbColorChanged === undefined) {
      this.cbColorChanged = false;
    }
    if (this.cbColorChanged && cbExec) {
      this.cbColorChanged(this.color_);
    }
    this.setSliders(color, false);
  }
  color() {
    return this.color_;
  }
  initSliders(color) {
    this.sliders = [];
    this.sliders.push(
      new Slider(
        p5js.color(255, 0, 0, 255),
        this.color2Percentage(p5js.red(color)),
        this.size().w,
        this.side,
        (percentage) => {
          const color = this.color();
          color.setRed(this.percentage2Color(percentage));
          this.setColor(color);
        }
      )
    );
    this.sliders.push(
      new Slider(
        p5js.color(0, 255, 0, 255),
        this.color2Percentage(p5js.green(color)),
        this.size().w,
        this.side,
        (percentage) => {
          const color = this.color();
          color.setGreen(this.percentage2Color(percentage));
          this.setColor(color);
        }
      )
    );
    this.sliders.push(
      new Slider(
        p5js.color(0, 0, 255, 255),
        this.color2Percentage(p5js.blue(color)),
        this.size().w,
        this.side,
        (percentage) => {
          const color = this.color();
          color.setBlue(this.percentage2Color(percentage));
          this.setColor(color);
        }
      )
    );
    this.sliders.push(
      new Slider(
        p5js.color(0, 0, 0, 0),
        this.color2Percentage(p5js.alpha(color)),
        this.size().w,
        this.side,
        (percentage) => {
          const color = this.color();
          color.setAlpha(this.percentage2Color(percentage));
          this.setColor(color);
        }
      )
    );
  }
  setSliders(color, cbExec) {
    this.setSlider(rSlider, color, cbExec);
    this.setSlider(gSlider, color, cbExec);
    this.setSlider(bSlider, color, cbExec);
    this.setSlider(aSlider, color, cbExec);
  }
  setSlider(slider, color, cbExec) {
    this.sliders[slider.i].setColor(slider.get(color), cbExec);
  }
  percentage2Color(percentage) {
    return (percentage * 255) / 100;
  }
  color2Percentage(color) {
    return (color * 100) / 255;
  }
  display() {
    const tStart = p5js.millis();
    this.displayCheckBox();

    if (this.selected) {
      //this.displayColor();
      this.displayGradientUsingPixel();
      //this.displayGradient();
      this.displaySliders();
    }
    //console.log(p5js.millis() - tStart);
  }
  displayCheckBox() {
    p5js.stroke(255);
    p5js.strokeWeight(1);
    p5js.fill(this.color());
    p5js.rect(this.getX(), this.getY(), this.size().w, this.size().h);
  }
  displayColor() {
    p5js.stroke(255);
    p5js.strokeWeight(1);
    p5js.fill(this.color());
    p5js.rect(this.basePoint().x, this.basePoint().y, this.side, this.side);
  }
  displayGradient() {
    p5js.colorMode(p5js.HSB, this.side);
    for (let h = 0; h < this.side; h++) {
      for (let s = 0; s < this.side; s++) {
        p5js.stroke(h, s, p5js.brightness(this.color()));
        p5js.strokeWeight(2);
        p5js.point(this.basePoint().x + h, this.basePoint().y + s);
      }
    }
    p5js.colorMode(p5js.RGB);
  }
  displayGradientUsingPixel() {
    p5js.loadPixels();
    const alpha = p5js.alpha(this.color());
    let i = 0;
    for (let s = 0; s < this.side; s++) {
      for (let h = 0; h < this.side; h++) {
        let [r, g, b] = HSBToRGB(
          (h * 360) / this.side,
          (s * 100) / this.side,
          100
        );
        p5js.pixels[i] = r;
        p5js.pixels[i + 1] = g;
        p5js.pixels[i + 2] = b;
        p5js.pixels[i + 3] = alpha;
        i += 4;
      }
      i += 4 * p5js.width - 4 * this.side;
    }
    p5js.updatePixels(
      this.basePoint().x,
      this.basePoint().y,
      this.side,
      this.side
    );
  }
  displaySliders() {
    for (let i = 0; i < this.sliders.length; i++) {
      const slider = this.sliders[i];
      slider.display(
        this.basePoint().x + this.side + i * slider.w,
        this.basePoint().y
      );
    }
  }
  mousePressed(x, y) {
    if (super.mousePressed(x, y)) {
      return true;
    }
    const slider = this.insideSlider(x, y);
    if (slider) {
      slider.mousePressed(x, y);
      this.sliderDragged = slider;
      return true;
    }
    return false;
  }
  mouseReleased(x, y) {
    if (this.sliderDragged) {
      this.sliderDragged.mouseReleased(x, y);
      this.sliderDragged = undefined;
    }
  }
  mouseDragged(x, y) {
    if (this.sliderDragged) {
      this.sliderDragged.mouseDragged(x, y);
    }
  }
  inside(x, y) {
    return (
      super.inside(x, y) || this.insidePicker(x, y) || this.insideSlider(x, y)
    );
  }
  insidePicker(x, y) {
    return Rect.inside(
      x,
      y,
      this.basePoint().x,
      this.basePoint().y,
      this.side,
      this.side
    );
  }
  insideSlider(x, y) {
    for (let i = 0; i < this.sliders.length; i++) {
      const slider = this.sliders[i];
      if (slider.inside(x, y)) {
        return slider;
      }
    }
  }
}

const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};
