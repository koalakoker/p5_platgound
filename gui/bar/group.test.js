function groupTest() {
  it("Group mouse interactions", () => {
    return new Promise((resolve, reject) => {
      let pushNumber = 0;
      let selectionChange = false;
      const xPos = iRand(0, 1000);
      const yPos = iRand(0, 1000);
      const grp = new Group(
        null,
        () => {
          selectionChange = true;
        },
        xPos,
        yPos
      );
      const pB = new PushButton(grp, "", () => {
        pushNumber++;
      });
      grp.append(pB);

      const checkInside = grp.inside(xPos + 5, yPos + 5);
      assert.isTrue(checkInside);

      const checkOutSide = grp.inside(xPos - 5, yPos + 5);
      assert.isFalse(checkOutSide);

      grp.mouseMoved(xPos + 5, yPos + 5);
      assert.deepEqual(pB.fillColor, pB.overColor());

      grp.mousePressed(xPos + 5, yPos + 5);
      assert.deepEqual(pB.fillColor, pB.clickColor());

      grp.mouseReleased(xPos + 5, yPos + 5);

      if (pushNumber === 1 && selectionChange) {
        resolve();
      } else {
        reject();
      }
    });
  });
  it("Test multiple element", () => {
    const bar = new Bar(null, 0, 0);

    const items = iRand(3, 15);
    const tElems = [];
    for (let i = 0; i < items; i++) {
      const pB = new PushButton(bar, "");
      bar.append(pB);
      tElems.push(pB);
    }
    let el;
    el = bar.element(-1);
    assert.isUndefined(el);
    el = bar.element(tElems.length);
    assert.isUndefined(el);
    for (let i = 0; i < items; i++) {
      el = bar.element(i);
      assert.equal(el, tElems[i]);
    }
  });
  it("Preload, display", () => {
    const bar = new Bar(null, 0, 0);
    bar.append(new GElem(bar, 0, 0, 10, 10));
    bar.append(new PushButton(bar, "png/icons8-right-2-50.png"));
    bar.preload();
    bar.display();
  });
  it("Test selection change behaviour", () => {
    const grp = new Group();
    const cB1 = new CheckButton(grp, "");
    grp.append(cB1);
    const cB2 = new CheckButton(grp, "");
    grp.append(cB2);

    grp.mousePressed(cB1.x + 5, cB1.y + 5);
    assert.isTrue(cB1.selected);
    assert.isFalse(cB2.selected);

    grp.mousePressed(cB2.x + 5, cB2.y + 5);
    assert.isFalse(cB1.selected);
    assert.isTrue(cB2.selected);

    grp.mousePressed(cB1.x + 5, cB1.y + 5);
    assert.isTrue(cB1.selected);
    assert.isFalse(cB2.selected);
  });
}
