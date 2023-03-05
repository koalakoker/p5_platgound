function controlTests() {
  it("Control tests", () => {
    return new Promise((resolve, reject) => {
      const x = iRand(0, 1000);
      const y = iRand(0, 1000);
      const ctr = new Control(x, y, (p) => {
        assert.equal(p.x, x + ro);
        assert.equal(p.y, y + ro);
        resolve();
      });
      assert.equal(ctr.x, x);
      assert.equal(ctr.y, y);
      assert.isFalse(ctr.dragged);

      ctr.draw();

      let ri = Math.floor(ctr.r / Math.sqrt(2));
      let ro = Math.ceil(ctr.r / Math.sqrt(2));
      assert.isTrue(ctr.inside(x + iRand(-ri, ri), y + iRand(-ri, ri)));
      assert.isFalse(ctr.inside(x + ro, y + ro));

      let mouseX = x + ro;
      let mouseY = y + ro;
      assert.isFalse(ctr.mousePressed(mouseX, mouseY));
      assert.isFalse(ctr.dragged);

      const grid = Drawing.getInstance().grid;
      grid.deActivate();
      mouseX = x + iRand(-ri, ri);
      mouseY = y + iRand(-ri, ri);
      assert.isTrue(ctr.mousePressed(mouseX, mouseY));
      assert.isTrue(ctr.dragged);
      mouseX = x + ro;
      mouseY = y + ro;
      ctr.mouseDragged(mouseX, mouseY);
      ctr.mouseReleased(mouseX, mouseY);
      reject();
    });
  });
}
