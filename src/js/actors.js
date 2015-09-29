export const actorChars = {
  "@": Player,
  "o": Coin,
  "=": Lava, "|": Lava, "v": Lava
}

export class Player {
  constructor(pos) {
    this.pos = pos.plus(new Vector(0, -0.5));
    this.size = new Vector(0.8, 1.5);
    this.speed = new Vector(0, 0);
  }

  get type() {
    return "player";
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
}

export class Coin {
  constructor(pos) {
    this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
    this.size = new Vector(0.6, 0.6);
    this.wobble = Math.random() * Math.PI * 2;
  }

  get type() {
    return "coin";
  }
}
