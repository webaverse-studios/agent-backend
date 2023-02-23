const feathersClient = require('@feathersjs/client');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');

// create a socket.io client instance
const socket = io('http://localhost:3030');

// configure the feathers client with the socket.io transport layer
const feathersApp = feathersClient()
  .configure(socketio(socket));

// send data to the create() method of the service
const prompt = 'test';
const recipient = '2dc79985-d7e8-4e06-9d4b-1e7e8cde6f16';
const response = new ArrayBuffer(8);
const data = { prompt, recipient, response };
feathersApp.service('voice-cache').create(data)
  .then(result => {
    console.log('Data sent successfully', result);
  })
  .catch(error => {
    console.error('Error sending data', error);
  });
