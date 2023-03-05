function rectangleTests() {
  it("Rectangle tests", () => {
    const x1 = iRand(0, 1000);
    const x2 = x1 + iRand(-50, 50);
    const y1 = iRand(0, 1000);
    const y2 = y1 + iRand(-50, 50);
    let r = new Rectangle(x1, y1, x1, y1);
    assert.equal(r.x1, x1);
    assert.equal(r.y1, y1);
    assert.equal(r.x2, x1);
    assert.equal(r.y2, y1);
    assertControlRect(r);
    assert.isTrue(r.isEmpty());

    r.addPoint({ x: x2, y: y2 });
    assert.equal(r.x2, x2);
    assert.equal(r.y2, y2);
    assertControlRect(r);
    assert.isFalse(r.isEmpty());

    r.draw();

    const dx = iRand(0, 500);
    const dy = iRand(0, 500);
    r.move(dx, dy);
    assert.equal(r.x1, x1 + dx);
    assert.equal(r.y1, y1 + dy);
    assert.equal(r.x2, x2 + dx);
    assert.equal(r.y2, y2 + dy);
    assertControlRect(r);

    let area = {
      p1: { x: x1, y: y1 },
      p2: { x: x2 + dx, y: y2 + dy },
    };
    assert.isTrue(r.isInsideArea(area));
    area = {
      p1: { x: x1 - 1000, y: y1 - 1000 },
      p2: { x: x2 - 1000 + dx, y: y2 - 1000 + dy },
    };
    assert.isFalse(r.isInsideArea(area));

    const w = x2 - x1;
    const h = y2 - y1;
    assert.isTrue(
      r.inside(x1 + dx + Math.floor(w / 2), y1 + dy + Math.floor(h / 2))
    );
    assert.isFalse(
      r.inside(
        x1 + dx + Math.floor((3 * w) / 2),
        y1 + dy + Math.floor((3 * h) / 2)
      )
    );

    const ser = r.serialize();
    r.x1 = iRand(0, 1000);
    r.y1 = iRand(0, 1000);
    r.x2 = iRand(0, 1000);
    r.y2 = iRand(0, 1000);
    assert.notEqual(r.x1, x1 + dx);
    assert.notEqual(r.y1, y1 + dy);
    assert.notEqual(r.x2, x2 + dx);
    assert.notEqual(r.y2, y2 + dy);
    r = Element.deserialize(ser);
    assert.equal(r.x1, x1 + dx);
    assert.equal(r.y1, y1 + dy);
    assert.equal(r.x2, x2 + dx);
    assert.equal(r.y2, y2 + dy);
  });
}

function assertControlRect(r) {
  assert.equal(r.controls[0].x, r.x1);
  assert.equal(r.controls[0].y, r.y1);
  assert.equal(r.controls[1].x, r.x2);
  assert.equal(r.controls[1].y, r.y2);
}
