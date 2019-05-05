const car = require('./handlers/car');
const express = require('express');
const bodyParser = require('body-parser');
const deleteAuthorization = require('./middlewares/delete-authorization');
const carRouter = express.Router();

carRouter.use(bodyParser.urlencoded({ extended: true }));
carRouter.use(bodyParser.json());
carRouter.use(deleteAuthorization);

carRouter.get('/', car.getCars);
carRouter.get('/:id', car.getCar);
carRouter.post('/', car.addCar);
carRouter.put('/:id', car.updateCar);
carRouter.delete('/:id', car.deleteCar);
module.exports = carRouter;