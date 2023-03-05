function styleTests() {
  it("Constructor", () => {
    const s = new Style();
    assert.isTrue(s.fill);
    assert.deepEqual(s.fillColor, p5js.color(0, 0, 0, 255));
    assert.isTrue(s.stroke);
    assert.deepEqual(s.strokeColor, p5js.color(255, 255, 255, 255));
    assert.equal(s.strokeWeight, 1);
    let s2 = new Style(s);
    assert.notEqual(s, s2);
    assert.deepEqual(s, s2);
  });
  it("Set", () => {
    const s = new Style();
    const testFillColor = p5js.color(6, 16, 26, 36);
    s.fillColor = testFillColor;
    const testStrokeColor = p5js.color(118, 128, 138, 148);
    s.strokeColor = testStrokeColor;
    const testStrokeWeight = rand(0, 100);
    s.strokeWeight = testStrokeWeight;
    s.set();
    s.fill = !s.fill;
    s.stroke = !s.stroke;
    s.set();
  });
  it("Serialize Deserialize", () => {
    const s = new Style();
    const ser = s.serialize();
    assert.equal(
      ser,
      '{"fill":true,"fillColor":{"r":0,"g":0,"b":0,"a":255},"stroke":true,"strokeColor":{"r":255,"g":255,"b":255,"a":255},"strokeWeight":1}'
    );
    const ser2 =
      '{"fill":false,"fillColor":{"r":1,"g":2,"b":3,"a":254},"stroke":false,"strokeColor":{"r":4,"g":5,"b":6,"a":253},"strokeWeight":7}';
    s.deserialize(ser2);
    assert.isFalse(s.fill);
    assert.deepEqual(s.fillColor, p5js.color(1, 2, 3, 254));
    assert.isFalse(s.stroke);
    assert.deepEqual(s.strokeColor, p5js.color(4, 5, 6, 253));
    assert.equal(s.strokeWeight, 7);
  });
}
