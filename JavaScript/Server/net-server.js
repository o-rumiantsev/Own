'use strict';

const net = require('net');

const sockets = new Set();
const server = net.createServer((socket) => {
  sockets.forEach((sckt) => {
    sckt.write(`${socket.remotePort} connected\n`);
  });
  socket.setEncoding('utf8');
  socket.on('data', (data) => {
    sockets.forEach((sckt) => {
      sckt.write(`📨  ${socket.remotePort}: ` + data);
    });
  });

  socket.on('end', () => {
    console.log(`Client ${socket.remotePort} disconnected`);
    sockets.delete(socket);
    sockets.forEach((sckt) =>{
      sckt.write(`${socket.remotePort} disconnected\n`);
    });
  });

});

server.listen(8080);
console.log(server.address());
server.on('error', (err) => {
  throw err;
});

server.on('connection', (socket) => {
  sockets.add(socket);
  console.log(`Client ${socket.remotePort} connected`);
  socket.write(`You are on server\nRemote port: ${socket.remotePort}\n`);
});
