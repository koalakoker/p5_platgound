class TransparentCheck {
  constructor() {}
  display(x, y, w, h) {
    // Transparent check
    stroke(255);
    strokeWeight(1);
    fill(0);
    rect(x, y, w, h);
    stroke(255, 0, 0);
    strokeWeight(2);
    line(x + 2, y + 2, x + w - 2, y + h - 2);
  }
}
