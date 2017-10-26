'use strict';

const readline = require('readline');
const separation = require('./separation.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if (key.sequence === '\u0020') {
    process.stdout.write(String.fromCharCode(0x2228) + ' ');
  }
});

input();

function input() {
  rl.question('\nВведіть ДДНФ:', (answer) => {
    if (answer === 'exit') {
      rl.close();
    } else {
      separation.toGroups(answer);
      rl.pause();
      input();
    }
  });
}
