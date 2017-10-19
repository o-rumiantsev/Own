'use strict';

const readline =  require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

calculationLoop();

function calculationLoop() {
  rl.question('Enter expression: ', (answer) => {
    if (answer === 'exit') {
      rl.close()
    } else {
      console.log(eval(answer.replace(/\b[a-zA-Z]/g,'Math.$&')));
      rl.pause()
      calculationLoop();
    }
  })
};
