class Test {
  constructor() {}
  test1() {
    const obs1 = new Observer("OBS1", (msg) => {
      console.log("OBS1", msg);
    });
    const obs2 = new Observer("OBS2", (msg) => {
      console.log("OBS2", msg);
    });
    const subj1 = new Subject();
    const subj2 = new Subject();

    subj1.attach(obs1);
    subj2.attach(obs1);
    subj2.attach(obs2);

    subj1.notify("Sub1");
    subj2.notify("Sub2");
  }
  test2() {
    const kl = new KeyLogger();
    const shortCut = new ShortCut("ShortCut");
    kl.attach(shortCut);
    kl.setState("Key logger - State change");
  }
}
