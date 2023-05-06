function editElementTests() {
  const initTxt = "";
  const pX = rand(0, 1000);
  const pY = rand(0, 1000);
  const x = rand(0, 1000);
  const y = rand(0, 1000);
  const w = rand(0, 500);
  const h = rand(0, 500);
  const parent = new GElem(null, pX, pY, 0, 0);

  it("constructor", () => {
    const eE = new EditElement(parent, x, y, w, h, initTxt);
    assert.equal(eE.getX(), pX + x);
    assert.equal(eE.getY(), pY + y);
    assert.equal(eE.w, w);
    assert.equal(eE.h, h);
    assert.equal(eE.editedText(), initTxt);
    eE.onClose();
  });
  it("setText", () => {
    const eE = new EditElement(parent, x, y, w, h, initTxt);
    const newTxt = "Hello W!";
    eE.setEditedText(newTxt);
    assert.equal(eE.editedText(), newTxt);
    eE.onClose();
  });
  it("Strip selection", () => {
    const beforeTxt = "Edit";
    const selTxt = "Element";
    const afterTxt = "Test";
    const txt = beforeTxt + selTxt + afterTxt;
    const eE = new EditElement(parent, x, y, w, h, txt);
    eE.selection.setRange(4, 11);
    const before = eE.stripBeforeSelection();
    const sel = eE.stripSelection();
    const after = eE.stripAfterSelection();
    assert.equal(before, beforeTxt);
    assert.equal(sel, selTxt);
    assert.equal(after, afterTxt);
    eE.onClose();
  });
  it("E2E tests keyboard", () => {
    const txt = "EditElementTest";
    const eE = new EditElement(parent, x, y, w, h, txt);
    eE.copyMode = copyModeInternal;
    keyEventGen("keydown", new KeyState("ArrowRight"), 4);
    keyEventGen("keydown", new KeyState("ArrowRight").addShift(), 7);
    keyEventGen("keydown", new KeyState("x").addMeta());
    assert.equal(eE.editedText(), "EditTest");
    keyEventGen("keydown", new KeyState("ArrowRight").addMeta());
    keyEventGen("keydown", new KeyState("v").addMeta());
    assert.equal(eE.editedText(), "EditTestElement");
    keyEventGen("keydown", new KeyState("ArrowLeft"), 7);
    keyEventGen("keydown", new KeyState("ArrowLeft").addShift(), 4);
    keyEventGen("keydown", new KeyState("c").addMeta());
    keyEventGen("keydown", new KeyState("ArrowLeft").addMeta());
    keyEventGen("keydown", new KeyState("v").addMeta());
    assert.equal(eE.editedText(), "TestEditTestElement");
    keyEventGen("keydown", new KeyState("ArrowLeft").addMeta());
    keyEventGen("keydown", new KeyState("ArrowRight").addMeta().addShift());
    keyEventGen("keydown", new KeyState("c").addMeta());
    keyEventGen("keydown", new KeyState("ArrowRight"));
    keyEventGen("keydown", new KeyState("v").addMeta());
    assert.equal(eE.editedText(), "TestEditTestElementTestEditTestElement");
    keyEventGen("keydown", new KeyState("ArrowRight").addMeta());
    keyEventGen("keydown", new KeyState("ArrowLeft").addMeta().addShift());
    keyEventGen("keydown", new KeyState("c").addMeta());
    keyEventGen("keydown", new KeyState("Backspace"));
    assert.equal(eE.editedText(), "");
    keyEventGen("keydown", new KeyState("v").addMeta());
    assert.equal(eE.editedText(), "TestEditTestElementTestEditTestElement");
    keyEventGen("keydown", new KeyState("ArrowRight").addMeta());
    keyEventGen("keydown", new KeyState("ArrowLeft").addMeta().addShift());
    keyEventGen("keydown", new KeyState("P"));
    keyEventGen("keydown", new KeyState("i"));
    keyEventGen("keydown", new KeyState("p"));
    keyEventGen("keydown", new KeyState("p"));
    keyEventGen("keydown", new KeyState("o"));
    assert.equal(eE.editedText(), "Pippo");
    eE.onClose();
  });
  it("E2E tests mouse", () => {
    const txt = "EditElementTest";
    const eE = new EditElement(parent, x, y, w, h, txt);
  });
}
