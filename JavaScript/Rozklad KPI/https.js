'use strict';

const readline = require('readline');
const groups = require(__dirname + '/groups.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// getting group name

const askGroup = () => {
  rl.question('Введіть назву группи: ', (group) => {
    groups.getId(group);
    rl.close()
  });
}

// Usage

askGroup();
