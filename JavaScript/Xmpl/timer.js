'use strict';

let secs, mins;

const readline = require('readline');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Set timer: ', (answer) => { // Set the number of minutes and seconds
  const date = answer.split(':');        // to be counted to
  rl.close()                             // separeted by a colon
  mins = parseInt(date[0]);
  secs = parseInt(date[1]);
  console.log(`Timer set for ${mins} minute(s) and ${secs} second(s)`);
  timeMachine.timerOn();
});

const timeMachine = {
  timerOn() {
    this.interval = setInterval(() => timer(), 1000);
  }
}

timer = timer.bind(timeMachine);

function timer() {
  if ((mins > 9) && (secs > 9)) {
    writeTimeLeft('','');
    secs--;
  } else if ((mins > 9) && (secs > -1)) {
    writeTimeLeft('','0');
    secs--;
    if (secs === -1) {
      mins--;
      secs = 59;
    };
  } else if ((mins > -1) && (secs > 9)){
    writeTimeLeft('0','');
    secs--;
  } else if ((mins > -1) && (secs > -1)){
    writeTimeLeft('0','0');
    if (mins === 0 && secs === 0) {
      clearInterval(this.interval);
      this.interval = null;
      console.log('\nTIME IS OUT!');
      return;
    };
    secs--;
    if (secs === -1) {
      mins--;
      secs = 59;
    };
  };
}

function writeTimeLeft(zeroMins, zeroSecs) {
  process.stdout.write(
  '\b\b\b\b\b' + `${zeroMins}${mins}:${zeroSecs}${secs}`
  );
}
