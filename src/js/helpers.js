export const arrowCodes = {37: "left", 38: "up", 39: "right"};

export function trackKeys(codes) {
  let pressed = Object.create(null);

  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      let down = event.type === "keydown";
      pressed[codes[event.keyCode]] = down;
      event.preventDefault();
    }
  }

  addEventListener("keydown", handler);
  addEventListener("keyup", handler);

  return pressed;
}

export function runAnimation(frameFunc) {
  let lastTime = null;

  function frame(time) {
    let stop = false;

    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }

    lastTime = time;
    if (!stop) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
