'use strict';

const asyncify = fn => (...args) => {
  const callback = args.pop();
  process.nextTick(() => {
    callback(null, fn(...args));
  });
};

module.exports = asyncify;
