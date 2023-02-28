function circleTests() {
  it("Constructor and addPoint", () => {
    const posX = Math.floor(rand(0, 1000));
    const posY = Math.floor(rand(0, 1000));
    let c = new Circle(posX, posY, 0);

    assert.equal(c.x, posX);
    assert.equal(c.y, posY);
    assert.equal(c.r, 0);

    c.addPoint({ x: posX + 50, posY });
  });
}
