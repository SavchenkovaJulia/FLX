const dataStoragePath = './db/data.json';
const fs = require('fs');

function getStorage() {
  return JSON.parse(fs.readFileSync(dataStoragePath, 'utf8'));
}

const getCars = (req, res) => {
  let cars = getStorage();
  res.status(200).send(cars);
};

const getCar = (req, res) => {
  let cars = getStorage();
  let car = null;
  let id = req.params.id;
  for (var i = 0; i < cars.length; i++) {
    if (cars[i].id == id) {
      car = cars[i];
      break;
    }
  }
  if (car) {
    res.status(200).send(car);
  } else {
    res.status(404).send();
  }
};

const addCar = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let reqCar = {
    id: req.body.id,
    brand: req.body.brand,
    model: req.body.model,
    engineVolume: req.body.engineVolume,
    year: req.body.year
  };
  let cars = getStorage();
  for (var i = 0; i < cars.length; i++) {
    if (cars[i].id == reqCar.id) {
      res.status(409).send({ message: 'Car already exists.' });
      break;
    }
  }

  cars.push(reqCar);
  fs.writeFileSync(dataStoragePath, JSON.stringify(cars));
  res.status(201).send(reqCar);
};

const updateCar = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let car;
  let carId = req.body.id;
  let cars = getStorage();
  for (var i = 0; i < cars.length; i++) {
    if (cars[i].id == carId) {
      car = cars[i];
      break;
    }
  }
  if (car) {
    car.brand = req.body.brand;
    car.model = req.body.model;
    car.engineVolume = req.body.engineVolume;
    car.year = req.body.year;
    fs.writeFileSync(dataStoragePath, JSON.stringify(cars));
    res.status(200).send(car);
  } else {
    res.status(404).send();
  }
};

const deleteCar = (req, res) => {
  let id = req.params.id;
  let cars = getStorage();
  let index = -1;

  for (var i = 0; i < cars.length; i++) {
    if (cars[i].id == id) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    let car = cars.splice(index, 1)[0];
    fs.writeFileSync(dataStoragePath, JSON.stringify(cars));
    res.status(200).send({ message: 'The car has been successfully removed' });
  } else {
    res.status(404).send();
  }
};

module.exports = { getCars, getCar, addCar, updateCar, deleteCar };
