function isTypeOf(object, type) {
  return type.prototype.isPrototypeOf(object);
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function iRand(min, max) {
  return Math.floor(rand(min, max));
}
function round(x) {
  return Math.round(x);
}

function simulateWait(diag, msec) {
  for (let i = 0; i < msec; i++) {
    diag.tween.update(1);
  }
}
