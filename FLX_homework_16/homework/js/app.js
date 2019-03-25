function assign(target){
    if(target === undefined || target === null){
        throw new TypeError('Cannot convert first argument to object')
    }

    target = Object(target);

    for(var index=1; index < arguments.length; index++){
        var source = arguments[index];

        if(source !== null){
            for(var key in source){
                if(Object.prototype.hasOwnProperty.call(source, key)){
                    target[key] = source[key]
                }
            }
        }
    }
    return target;
}

function Bot(data) {
    this.name = data.name;
    this.speed = data.speed;
    this.x = data.x;
    this.y = data.y;
    this.defaultSpeed = data.speed;
  }

  Bot.prototype.getSpeed = function() {
    return this.speed;
  };
  Bot.prototype.setSpeed = function(newSpeed) {
    this.speed = newSpeed;
  };
  Bot.prototype.getDefaultSpeed = function() {
    return this.defaultSpeed;
  };
  Bot.prototype.getCoordinates = function() {
    return { x: this.x, y: this.y };
  };
  Bot.prototype.setCoordinates = function(newCoordinates) {
    this.x = newCoordinates.x;
    this.y = newCoordinates.y;
  };
  Bot.prototype.move = function(direction) {
    switch (direction) {
      case 'up':
        this.y += this.speed;
        break;
      case 'down':
        this.y -= this.speed;
        break;
      case 'left':
        this.x -= this.speed;
        break;
      case 'right':
        this.x += this.speed;
      default:
        console.error('Unacceptable direction');
    }
  };
  Bot.prototype.showPosition = function() {
    console.log(
      `I am ${this.constructor.name} '${this.name}' I am located at ${this.x}:${
        this.y
      } `
    );
  };

  let Botty = new Bot({ name: 'Betty', speed: 2, x: 0, y: 1 });
  Botty.showPosition();
  Botty.move('up');
  Botty.showPosition();
  Botty.move('left');
  Botty.move('down');
  Botty.move('up');
  Botty.move('up');
  Botty.move('up');
  Botty.move('up');
  Botty.showPosition();
