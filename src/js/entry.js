// Import CSS
import '../css/master.scss';

import Level from './level.js';
import DOMDisplay from './dom-display.js';

var simpleLevelPlan = [
  "                      ",
  "                      ",
  "  x              = x  ",
  "  x         o o    x  ",
  "  x @      xxxxx   x  ",
  "  xxxxx            x  ",
  "      x!!!!!!!!!!!!x  ",
  "      xxxxxxxxxxxxxx  ",
  "                      "
];

var simpleLevel = new Level(simpleLevelPlan);
var display = new DOMDisplay(document.body, simpleLevel);
