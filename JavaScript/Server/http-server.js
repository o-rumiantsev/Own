'use strict';

const http = require('http');

const server = http.createServer((req, res) => {
  server.on('connection', (socket) => {
    socket.write('It\'s ok');
  });
}).listen(8080);
