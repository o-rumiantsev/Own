'use strict';

const fs = require('fs');

const add = (a, b) => a + b;
const sum = (a, b, callback) => callback(a, b);

fs.readFile('./timer.js', (err, data) => {
  if (err) throw err;
  console.log(data);
});

sum(5, 2, (a, b) => {
  let res = 0;
  for (let i = 0; i < 100000; ++i) {
    res += a + b;
  }
  console.log('Use sum: ' + res);
});

console.log('Use add: ' + add(5, 2));
