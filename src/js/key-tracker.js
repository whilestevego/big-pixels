const arrowCodes = {37: "left", 38: "up", 39: "right"};

const KeyTracker = (function () {
  var instance;

  function createInstance() {
    return {
      codes: arrowCodes,
      pressed: new Object(),
      start: function () {
        this._handler = handler.bind(this);
        addEventListener("keydown", this._handler);
        addEventListener("keyup", this._handler);
      },
      stop: function() {
        removeEventListener("keydown", this._handler);
        removeEventListener("keyup", this._handler);
      }
    }
  }

  function getInstance() {
    if (!instance) instance = createInstance();
    return instance;
  }

  function handler(event) {
    if (this.codes.hasOwnProperty(event.keyCode)) {
      var down = event.type === "keydown";
      this.pressed[this.codes[event.keyCode]] = down;
      event.preventDefault();
    }
  }

  return {
    getInstance: getInstance,
  }
})();

export default KeyTracker;
