const scale = 20;

const elt = (name, className) => {
  let elt = document.createElement(name);
  if (className) elt.className = className;
  return elt;
}

export default class DOMDisplay {
  constructor(parent, level) {
    this.wrap  = parent.appendChild(elt("div", "game"));
    this.level = level;

    this.wrap.appendChild(this.drawBackground());
    this.actorLayer = null;
    this.drawFrame();
  }

  drawActors() {
    let wrap = elt("div");
    this.level.actors.forEach((actor) => {
      let rect = wrap.appendChild(elt("div", "actor " + actor.type));

      rect.style.width  = actor.size.x * scale + "px";
      rect.style.height = actor.size.y * scale + "px";
      rect.style.left   = actor.pos.x * scale + "px";
      rect.style.top    = actor.pos.y * scale + "px";
    });
    return wrap;
  }

  drawBackground() {
    let table = elt("table", "background");
    table.style.width = this.level.width * scale + "px";
    this.level.grid.forEach((row) => {
      let rowElt = table.appendChild(elt("tr"));
      rowElt.style.height = scale + "px";

      row.forEach(type => rowElt.appendChild(elt("td", type)))
    })

    return table;
  }

  drawFrame() {
    if (this.actorLayer)
      this.wrap.removeChild(this.actorLayer);
    this.actorLayer = this.wrap.appendChild(this.drawActors());
    this.wrap.className = "game " + (this.level.status || "");
    this.scrollPlayerIntoView();
  }

  scrollPlayerIntoView() {
    let width = this.wrap.clientWidth;
    let height = this.wrap.clientHeight;
    let marginX = width / 3;
    let marginY = height / 2;

    //The Viewport
    let left = this.wrap.scrollLeft, right = left + width;
    let top = this.wrap.scrollTop, bottom = top + height;

    let player = this.level.player;
    let center = player.pos.plus(player.size.times(0.5)).times(scale)

    if (center.x < left + marginX)
      this.wrap.scrollLeft = center.x - marginX;
    else if (center.x > right - marginX)
      this.wrap.scrollLeft = center.x + marginX - width;

    if (center.y < top + marginY)
      this.wrap.scrollTop = center.y - marginY;
    else if (center.y > bottom - marginY)
      this.wrap.scrollTop = center.y + marginY - height;
  }

  clear() {
    this.wrap.parentNode.removeChild(this.wrap);
  }
}
