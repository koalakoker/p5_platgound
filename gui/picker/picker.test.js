function pMousePressedTest(p) {
  const mainBar = Gui.getInstance().mainBar;
  // Check that main bar will be lock if cP is selected
  mainBar.unlock();

  assert.isFalse(p.selected);
  assert.isFalse(mainBar.isLock());
  p.mousePressed(p.x + 5, p.y + 5);
  assert.isTrue(p.selected);
  assert.isTrue(mainBar.isLock());
}

function pMouseMoved(p) {
  let debounceCompleted = false;
  assert.isTrue(p.selected);
  assert.isNull(p.debounceTimer);
  const pOutside = { x: p.x + p.w + 5, y: p.y + 5 };
  p.mouseMoved(pOutside.x, pOutside.y, 10).then(() => {
    debounceCompleted = true;
  });
  assert.isNotNull(p.debounceTimer);

  const pInside = { x: p.x + 5, y: p.y + p.h + 5 };
  p.mouseMoved(pInside.x, pInside.y);
  assert.isNull(p.debounceTimer);
  assert.isFalse(debounceCompleted);

  p.mouseMoved(pOutside.x, pOutside.y, 10).then(() => {
    assert.isFalse(p.selected);
    assert.isNull(p.debounceTimer);
  });
}
