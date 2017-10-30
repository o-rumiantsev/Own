'use strict';

// exports to iteration.js
exports.writeSolution = (arr) => {
  const res = arr
    .toString()
    .replace(/x/g, '')
    .replace(/,/g, ' V ');
  console.log(`\nСДНФ: ${res}`);
};
