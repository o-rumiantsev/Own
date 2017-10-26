'use strict';

exports.writeSolution = (arr) => {
  const res = arr
    .toString()
    .replace(/x/g, '')
    .replace(/,/g, ' V ');
  console.log(`\nСДНФ: ${res}`);
};
