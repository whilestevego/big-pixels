import Vector from './vector.js';

/* Player Settings */
const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

export class Player {
  constructor(pos) {
    this.pos = pos.plus(new Vector(0, -0.5));
    this.size = new Vector(0.8, 1.5);
    this.speed = new Vector(0, 0);
  }

  get type() {
    return "player";
  }

  moveX(step, level, keys) {
    this.speed.x = 0;
    if (keys.left) this.speed.x -= playerXSpeed;
    if (keys.right) this.speed.x += playerXSpeed;

    let motion = new Vector(this.speed.x * step, 0);
    let newPost = this.pos.plus(motion);
    let obstacle = level.obstacleAt(newPos, this.size);

    if (obstacle)
      level.playerTouched(obstacle);
    else
      this.pos = newPos;
  }

  moveY(step, level, keys) {
    this.speed.y += step * gravity;
    let motion = new Vector(0, this.speed.y * step);
    let newPos = this.pos.plus(motion);
    let obstacle = level.obstacleAt(newPos, this.size);

    if (obstacle) {
      level.playerTouched(obstacle);

      if (keys.up && this.speed.y > 0)
        this.speed.y = -jumpSpeed;
      else
        this.speed.y = 0;
    } else {
      this.pos = newPos;
    }
  }

  act(step, level, keys) {
    this.moveX(step, level, keys);
    this.moveY(step, level, keys);

    let otherActor = level.actorAt(this);
    if (otherActor)
      level.playerTouched(otherActor.type, otherActor);

    if (level.status  === "lost") {
      this.pos.y += step;
      this.size.y -= step;
    }
  }
}

export class Lava {
  constructor(pos, ch) {
    this.pos = pos;
    this.size = new Vector(1, 1);

    switch (ch) {
      case "=":
        this.speed = new Vector(2, 0);
        break;
      case "|":
        this.speed = new Vector(0, 2);
        break;
      case "=":
        this.speed = new Vector(0, 3);
        this.repeatPos = pos;
        break;
    }
  }

  get type() {
    return "lava";
  }

  act(step, level) {
    let newPos = this.pos.plus(this.speed.times(step));

    if (!level.obstacleAt(newPos, this.size))
      this.pos = newPos;
    else if (this.repeatPos)
      this.pos = this.repeatPos;
    else
      this.speed = this.speed.times(-1);
  }
}

/* Coin Settings */
const wobbleSpeed = 8;
const wobbleDist = 0.07;

export class Coin {
  constructor(pos) {
    this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
    this.size = new Vector(0.6, 0.6);
    this.wobble = Math.random() * Math.PI * 2;
  }

  get type() {
    return "coin";
  }

  act(step) {
    this.wobble += step * wobbleSpeed;
    let wobblePos = Math.sin(this.wobble) * wobbleDist;
    this.pos = this.basePos.plus(new Vector(0, wobblePos));
  }
}
