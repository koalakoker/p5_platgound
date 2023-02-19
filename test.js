class Test {
  constructor() {}
  test1() {
    const shortCut = new ShortCut("Test ShortCut", (msg) => {
      console.log(msg);
    });
    kl.attach(shortCut);
    // cmd+z
    kl.keyPressed("Meta");
    kl.keyPressed("z");
    kl.keyReleased("z");
    kl.keyReleased("Meta");
    // shift+cmd+z
    kl.keyPressed("Shift");
    kl.keyPressed("Meta");
    kl.keyPressed("z");
    kl.keyReleased("z");
    kl.keyReleased("Meta");
    kl.keyReleased("Shift");
    kl.detach(shortCut);
  }
}
