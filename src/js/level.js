import {actorChars, Player, Lava, Coin} from './actors.js';
import Vector from './vector.js';

export default class Level {
  constructor(plan) {
    this.width = plan[0].length;
    this.height = plan.length;
    this.grid = [];
    this.actors = [];

    for (let y = 0; y < this.height; y++) {
      let line = plan[y], gridLine = [];

      for (let x = 0; x < this.width; x++) {
        let ch = line[x], fieldType = null;
        let Actor = actorChars[ch];

        if (Actor)
          this.actors.push(new Actor(new Vector(x, y), ch));
        else if (ch == "x")
          fieldType = "wall";
        else if (ch == "!")
          fieldType = "lava";
        gridLine.push(fieldType);
      }

      this.grid.push(gridLine);
      this.player = this.actors.filter(actor => actor.type == "player")[0];
      this.status = this.finishDelay = null;
    }
  }

  isFinished() {
    return this.status != null && this.finishDelay < 0
  }
}
