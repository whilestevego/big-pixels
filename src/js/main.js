// Import CSS
import '../css/master.scss';

import Level from './level.js';
import DOMDisplay from './dom-display.js';
import KeyTracker from './key-tracker.js';
import Maps from './maps.js';

KeyTracker.getInstance().start();

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

function runLevel(level, Display, andThen) {
  let display = new Display(document.body, level);

  runAnimation((step) => {
    level.animate(step, KeyTracker.getInstance().pressed);
    display.drawFrame(step);

    if (level.isFinished()) {
      display.clear();
      if (andThen) andThen(level.status);
      return false;
    }
  });
}

function runGame(plans, Display) {
  let lives = 3;

  function startLevel(n) {

    runLevel(new Level(plans[n]), Display, (status) => {
      if (status == "lost") {
        console.log("Lives left: ", --lives);
        if (!lives) {
          lives = 3;
          console.log("Lives left: ", lives);
          startLevel(0);
        } else {
          startLevel(n);
        }
      } else if (n < plans.length - 1) {
        startLevel(n + 1);
      } else {
        console.log("You win!");
      }
    });
  }
  startLevel(0);
}

runGame(Maps, DOMDisplay);
