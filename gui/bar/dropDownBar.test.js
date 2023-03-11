function dropDownBarTest() {
  it("Drop down bar testing", () => {
    const xPos = iRand(0, 1000);
    const yPos = iRand(0, 1000);
    const ddB = new DropDownBar(null, xPos, yPos);
    const pB = new PushButton(ddB, "", () => {
      console.log("Pushed");
    });
    assert.deepEqual(pB.fillColor, pB.normalColor());
    ddB.append(pB);

    ddB.mouseMoved(xPos + 5, yPos + 5);
    assert.deepEqual(pB.fillColor, pB.overColor());
  });
}
