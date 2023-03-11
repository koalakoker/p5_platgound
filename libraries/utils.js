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

function simulateWait(obj, msec) {
  if (isTypeOf(obj, DiagManager)) {
    obj = obj.activeDiag();
  } else if (isTypeOf(obj, Message)) {
  } else if (isTypeOf(obj, DropDownBar)) {
  } else return;
  for (let i = 0; i < msec; i++) {
    obj.tween.update(1);
  }
}
