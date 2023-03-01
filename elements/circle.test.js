function circleTests() {
  it("Circle tests", () => {
    const posX = iRand(0, 1000);
    const posY = iRand(0, 1000);
    let c = new Circle(posX, posY, 0);
    assert.equal(c.x, posX);
    assert.equal(c.y, posY);
    assert.equal(c.r, 0);
    assertControl(c);
    assert.isTrue(c.isEmpty());

    c.addPoint({ x: posX + 50, y: posY });
    assert.equal(c.r, 50);
    assertControl(c);
    assert.isFalse(c.isEmpty());

    const dx = iRand(0, 500);
    const dy = iRand(0, 500);
    c.move(dx, dy);
    assert.equal(c.x, posX + dx);
    assert.equal(c.y, posY + dy);
    assertControl(c);

    let area = {
      p1: { x: posX, y: posY },
      p2: { x: posX + dx, y: posY + dy },
    };
    assert.isTrue(c.isInsideArea(area));
    area = {
      p1: { x: posX - 1000, y: posY - 1000 },
      p2: { x: posX - 1000 + dx, y: posY - 1000 + dy },
    };
    assert.isFalse(c.isInsideArea(area));

    assert.isTrue(c.inside(posX + dx + 10, posY + dy - 10));
    assert.isFalse(c.inside(posX + dx + 100, posY + dy - 100));

    const ser = c.serialize();
    c.x = iRand(0, 1000);
    c.y = iRand(0, 1000);
    c.r = iRand(0, 1000);
    assert.notEqual(c.x, posX + dx);
    assert.notEqual(c.y, posY + dy);
    assert.notEqual(c.r, 50);
    c = Element.deserialize(ser);
    assert.equal(c.x, posX + dx);
    assert.equal(c.y, posY + dy);
    assert.equal(c.r, 50);
  });
}

function assertControl(c) {
  assert.equal(c.controls[0].x, c.x);
  assert.equal(c.controls[0].y, c.y);
  assert.equal(c.controls[1].x, c.x + c.r);
  assert.equal(c.controls[1].y, c.y);
}
