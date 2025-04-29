const io = require('socket.io-client');

const socket = io('http://localhost:3000'); // your NestJS API URL

socket.on('deviceCreated', (data) => {
  console.log('Device created:', data);
});

socket.on('deviceUpdated', (data) => {
  console.log('Device updated:', data);
});

socket.on('deviceDeleted', (data) => {
  console.log('Device deleted:', data);
});
