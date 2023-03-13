function sliderTest() {
  it("Constructor", () => {
    const maxVal = 100;
    const w = 20;
    const val = iRand(0, maxVal);
    const slider = new Slider(val, w, maxVal);
    assert.equal(slider.w, w);
    assert.equal(slider.maxValue, maxVal);
    assert.equal(slider.value(), val);
  });
  it("Modify", () => {
    const maxVal = 100;
    const w = 20;
    const val = 50;
    let changed = 0;
    const slider = new Slider(val, w, maxVal, () => {
      changed++;
    });
    let newVal;

    newVal = 75;
    slider.setValue(newVal);
    assert.equal(slider.value(), newVal);
    assert.equal(changed, 1);

    newVal = -10;
    slider.setValue(newVal);
    assert.equal(slider.value(), 0);
    assert.equal(changed, 2);

    newVal = 200;
    slider.setValue(newVal);
    assert.equal(slider.value(), 100);
    assert.equal(changed, 3);
  });
}
