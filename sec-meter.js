'use strict';

let secs = 1, mins = 0;
const time = () => {
  if (mins < 10) {
    writeSecs('0');
  } else if (mins < 60) {
    writeSecs('');
  };
};

setInterval(time, 1000);

function writeSecs(zeroMins) {
  if (secs < 10) {
    process.stdout.write(
    '\b\b\b\b\b' + `${zeroMins}${mins}:0${secs++}`
    );
  } else if (secs < 60) {
    process.stdout.write(
    '\b\b\b\b\b' + `${zeroMins}${mins}:${secs++}`
    );
    if (secs === 60) {
      mins++;
      secs = 0;
    };
  } 
};

process.stdout.write('00:00');
