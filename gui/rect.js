class Rect {
  static inside(x, y, xr, yr, w, h) {
    return x > xr && x < xr + w && y > yr && y < yr + h;
  }
}
