'use strict';

const readline = require('readline');

const readFromConsole = (callback) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter date: ', (answer) => {
    callback(answer);
    rl.close();
  });
};

module.exports = readFromConsole;
