const posX = Math.floor(rand(0, 1000));
const posY = Math.floor(rand(0, 1000));
let c = new Circle(posX, posY, 0);
// let c = {};
// c.x = posX;
// c.y = posY;
// c.r = 0;

function circleTests() {
  it("Constructor and addPoint", () => {
    assert.equal(c.x, posX);
    assert.equal(c.y, posY);
    assert.equal(c.r, 0);
  });
}
