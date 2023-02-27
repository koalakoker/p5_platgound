class Rect {
  static inside(x, y, xr, yr, w, h) {
    return x >= xr && x <= xr + w && y >= yr && y <= yr + h;
  }
  static rect(p1, p2) {
    let x;
    let y;
    let w;
    let h;
    if (p1.x < p2.x) {
      x = p1.x;
      w = p2.x - p1.x;
    } else {
      x = p2.x;
      w = p1.x - p2.x;
    }
    if (p1.y < p2.y) {
      y = p1.y;
      h = p2.y - p1.y;
    } else {
      y = p2.y;
      h = p1.y - p2.y;
    }
    return {
      x: x,
      y: y,
      w: w,
      h: h,
    };
  }
}
