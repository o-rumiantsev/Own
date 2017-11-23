'use strict';

// const http = require('http');
const net = require('net');

const server = net.createServer((socket) => {
  socket.end('goodbye\n');
}).on('error', (err) => {
  throw err
});

server.on('connetction', (socket) => {
  console.log('Client connected');
});

server.listen(() => {
  console.log(server.address());
});




























//
// const server = http.createServer((req, res) => {
//   res.end();
// });
//
// server.listen({
//   host: 'localhost',
//   port: 0
// });
//
// server.on();
