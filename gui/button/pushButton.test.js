function pushButtonTest() {
  it("Test", () => {
    const pushButton = new PushButton(null, "", () => {
      console.log("Pushed");
    });
    console.log(pushButton);
    pushButton.activate();
  });
}
