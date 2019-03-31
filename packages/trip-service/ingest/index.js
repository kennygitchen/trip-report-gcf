'use strict';

const model = require('@trip-service/model');

exports.trip_ingest = (request, response) => {
  console.error(`Trip class = ${model.Trip}`);
  const trip = new model.Trip('TEST', 'Hellow World');
  response.status(200).send(JSON.stringify(trip));
};

exports.event = (event, callback) => {
  callback();
};
