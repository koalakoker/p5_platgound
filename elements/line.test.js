function lineTests() {
  it("Line tests", () => {
    const x1 = iRand(0, 1000);
    const x2 = x1 + iRand(-50, 50);
    const y1 = iRand(0, 1000);
    const y2 = y1 + iRand(-50, 50);
    let l = new Rectangle(x1, y1, x1, y1);
    assert.equal(l.x1, x1);
    assert.equal(l.y1, y1);
    assert.equal(l.x2, x1);
    assert.equal(l.y2, y1);
    assertControlLine(l);
    assert.isTrue(l.isEmpty());

    l.addPoint({ x: x2, y: y2 });
    assert.equal(l.x2, x2);
    assert.equal(l.y2, y2);
    assertControlLine(l);
    assert.isFalse(l.isEmpty());

    const dx = iRand(0, 500);
    const dy = iRand(0, 500);
    l.move(dx, dy);
    assert.equal(l.x1, x1 + dx);
    assert.equal(l.y1, y1 + dy);
    assert.equal(l.x2, x2 + dx);
    assert.equal(l.y2, y2 + dy);
    assertControlLine(l);

    let area = {
      p1: { x: x1, y: y1 },
      p2: { x: x2 + dx, y: y2 + dy },
    };
    assert.isTrue(l.isInsideArea(area));
    area = {
      p1: { x: x1 - 1000, y: y1 - 1000 },
      p2: { x: x2 - 1000 + dx, y: y2 - 1000 + dy },
    };
    assert.isFalse(l.isInsideArea(area));

    const w = x2 - x1;
    const h = y2 - y1;
    assert.isTrue(
      l.inside(x1 + dx + Math.floor(w / 2), y1 + dy + Math.floor(h / 2))
    );
    assert.isFalse(
      l.inside(
        x1 + dx + Math.floor((3 * w) / 2),
        y1 + dy + Math.floor((3 * h) / 2)
      )
    );

    const ser = l.serialize();
    l.x1 = iRand(0, 1000);
    l.y1 = iRand(0, 1000);
    l.x2 = iRand(0, 1000);
    l.y2 = iRand(0, 1000);
    assert.notEqual(l.x1, x1 + dx);
    assert.notEqual(l.y1, y1 + dy);
    assert.notEqual(l.x2, x2 + dx);
    assert.notEqual(l.y2, y2 + dy);
    l = Element.deserialize(ser);
    assert.equal(l.x1, x1 + dx);
    assert.equal(l.y1, y1 + dy);
    assert.equal(l.x2, x2 + dx);
    assert.equal(l.y2, y2 + dy);
  });
}

function assertControlLine(l) {
  assert.equal(l.controls[0].x, l.x1);
  assert.equal(l.controls[0].y, l.y1);
  assert.equal(l.controls[1].x, l.x2);
  assert.equal(l.controls[1].y, l.y2);
}
