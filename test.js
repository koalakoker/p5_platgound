class Test {
  constructor() {}
  test1() {
    const obs1 = new Observer("OBS1", (msg) => {
      console.log("OBS1", msg);
    });
    const obs2 = new Observer("OBS2", (msg) => {
      console.log("OBS2", msg);
    });
    const subj1 = new Subject("Sub1");
    const subj2 = new Subject("Sub2");

    subj1.attach(obs1);
    subj2.attach(obs1);
    subj2.attach(obs2);

    subj1.notify();
    subj2.notify();
  }
}
