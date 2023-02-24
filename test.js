const assert = chai.assert;

describe("KeyLogger", keyLoggerTest);

describe("KeyState", function () {
  it("Check KeyState isEqual method", checkKeyStateIsEqualMethod);
});

describe("ShortCut", function () {
  it(
    "Check KeyLogger and ShortCut opeartions",
    CheckKeyLoggerAndShortCutOpeartions
  );
});
