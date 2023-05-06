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

function toRGBA(color) {
  return {
    r: p5js.red(color),
    g: p5js.green(color),
    b: p5js.blue(color),
    a: p5js.alpha(color),
  };
}

function keyLogSimulatePress_z() {
  this.keyEventGen("keydown", new KeyState("z"));
  this.keyEventGen("keyup", new KeyState("z"));
}
function keyLogSimulatePress_ctrl_a() {
  this.keyEventGen("keydown", new KeyState("a").addCtrl());
  this.keyEventGen("keyup", new KeyState("a").addCtrl());
}
function keyLogSimulatePress_ctrl_z() {
  this.keyEventGen("keydown", new KeyState("z").addCtrl());
  this.keyEventGen("keyup", new KeyState("z").addCtrl());
}
function keyLogSimulatePress_shift_ctrl_z() {
  this.keyEventGen("keydown", new KeyState("Z").addCtrl().addShift());
  this.keyEventGen("keyup", new KeyState("Z").addCtrl().addShift());
}
function keyEventGen(type, ks, rep) {
  rep = rep || 1;
  var e = new KeyboardEvent(type, {
    key: ks.getKey(),
    ctrlKey: ks.isActive(KeyState.controlKey()),
    metaKey: ks.isActive(KeyState.metaKey()),
    altKey: ks.isActive(KeyState.altKey()),
    shiftKey: ks.isActive(KeyState.shiftKey()),
  });
  for (let i = 0; i < rep; i++) {
    window.dispatchEvent(e);
  }
}
const MouseLeftButton = 0;
const MouseRigthButton = 2;
function mouseEventGen(type, x, y, button) {
  var e = new MouseEvent(type, {
    screenX: x,
    screenY: y,
    clientX: x,
    clientY: y,
    button: button,
  });
  window.dispatchEvent(e);
}
