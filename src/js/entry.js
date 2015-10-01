// Import CSS
import '../css/master.scss';

import Level from './level.js';
import DOMDisplay from './dom-display.js';
import {arrowCodes, trackKeys, runAnimation} from './helpers.js';
import {MAPS} from './maps.js';

var arrows = trackKeys(arrowCodes);

function runLevel(level, Display, andThen) {
  let display = new Display(document.body, level);

  runAnimation((step) => {
    level.animate(step, arrows);
    display.drawFrame(step);

    if (level.isFinished()) {
      display.clear();
      if (andThen) andThen(level.status);
      return false;
    }
  });
}

function runGame(plans, Display) {
  function startLevel(n) {

    runLevel(new Level(plans[n]), Display, (status) => {
      if (status == "lost")
        startLevel(n);
      else if (n < plans.length - 1)
        startLevel(n + 1);
      else
        console.log("You win!");
    });
  }
  startLevel(0);
}

runGame(MAPS, DOMDisplay);
