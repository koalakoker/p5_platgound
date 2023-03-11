function dropDownBarTest() {
  it("Drop down bar testing", () => {
    let pushed = 0;
    const xPos = iRand(0, 1000);
    const yPos = iRand(0, 1000);
    const ddB = new DropDownBar(null, xPos, yPos);
    const pB = new PushButton(ddB, "", () => {
      pushed++;
    });
    assert.deepEqual(pB.fillColor, pB.normalColor());
    ddB.append(pB);

    ddB.mouseMoved(xPos + 5, yPos + 5);
    assert.deepEqual(pB.fillColor, pB.overColor());

    ddB.mousePressed(xPos + 5, yPos + 5);
    assert.deepEqual(pB.fillColor, pB.clickColor());
    assert.equal(pushed, 1);
  });
  it("Show and hide", () => {
    const xPos = iRand(0, 1000);
    const yPos = iRand(0, 1000);
    const ddB = new DropDownBar(null, xPos, yPos);
    const pB = new PushButton(ddB, "");
    ddB.append(pB);
    assert.isTrue(ddB.visible);
    assert.isTrue(ddB.lock);

    ddB.hide();
    assert.isTrue(ddB.visible);
    simulateWait(ddB, ddB.fadeOut + 10);
    assert.isFalse(ddB.visible);

    ddB.show();
    assert.isFalse(ddB.visible);
    simulateWait(ddB, ddB.fadeIn + 10);
    assert.isTrue(ddB.visible);

    ddB.lock = false;
    ddB.mouseMoved(0, ddB.y + ddB.size().h + 30);
    assert.isTrue(ddB.visible);
    simulateWait(ddB, ddB.fadeOut + 10);
    assert.isFalse(ddB.visible);

    ddB.mouseMoved(0, ddB.y + 4);
    assert.isFalse(ddB.visible);
    simulateWait(ddB, ddB.fadeIn + 10);
    assert.isTrue(ddB.visible);
  });
}
