function assign(target) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  target = Object(target);

  for (let index = 1; index < arguments.length; index++) {
    let source = arguments[index];

    if (source !== null) {
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
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
      break;
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

function Racebot(data) {
  Bot.call(this, data);
  this.previousMove = null;
}

Racebot.prototype = Object.create(Bot.prototype);
Racebot.prototype.constructor = Racebot;

Racebot.prototype.move = function(direction) {
  if (direction === this.previousMove) {
    this.speed += 1;
  } else {
    this.speed = this.defaultSpeed;
  }
  this.previousMove = direction;
  Bot.prototype.move.call(this, direction);
};

function Speedbot(data) {
  Bot.call(this, data);
}

Speedbot.prototype = Object.create(Bot.prototype);
Speedbot.prototype.constructor = Speedbot;

Speedbot.prototype.prepareEngine = function() {
  this.speed += 2;
  this.engineStatus = true;
};

Speedbot.prototype.move = function(direction) {
  Bot.prototype.move.call(this, direction);
  if (this.engineIsPrepared) {
    this.engineStatus = false;
    return;
  }

  if (this.speed > this.defaultSpeed) {
    this.speed -= 1;
  }
};
