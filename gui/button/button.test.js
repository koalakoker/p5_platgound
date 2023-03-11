function bTestMouseMoveOutside(b) {
  const mx = b.x - 5;
  const my = b.y - 5;
  b.mouseMoved(mx, my);
  assert.equal(b.lastX, mx);
  assert.equal(b.lastY, my);
  assert.deepEqual(b.fillColor, b.normalColor());
}

function bTestMouseMoveInside(b) {
  const mx = b.x + 5;
  const my = b.y + 5;
  b.mouseMoved(mx, my);
  assert.equal(b.lastX, mx);
  assert.equal(b.lastY, my);
  assert.deepEqual(b.fillColor, b.overColor());
}

function bTestMouseMoveAfterCheck(b) {
  const mx = b.x + 5;
  const my = b.y + 5;
  b.mousePressed(mx, my);
  b.mouseMoved(mx, my);
  assert.equal(b.lastX, mx);
  assert.equal(b.lastY, my);
  assert.deepEqual(b.fillColor, b.clickColor());
}
