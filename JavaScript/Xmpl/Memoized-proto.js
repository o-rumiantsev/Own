'use strict';

const util = require('util');

const generateKey = (args) => (
  args.map(x => x.toString() + ':' + typeof(x)).join('|')
);

function Memoized(max, fn) {
  if (typeof(max) === 'function') {
    fn = max;
    max = null;
  }


  const memoized = function(...args) {
    const key = generateKey(args);
    const record = memoized.cache.get(key);
    if (record) return record;
    const res = fn(...args);
    if (memoized.maxCount && memoized.cache.size > memoized.maxCount) {
      const firstItem = memoized.cache.keys().next().value;
      memoized.cache.delete(firstItem);
    }
    memoized.cache.set(key, res);
    if (memoized.timeout > 0) {
      setTimeout(() => {
        memoized.cache.delete(key);
      }, memoized.timeout);
    }
    return res;
  };

  memoized.cache = new Map();
  memoized.maxCount = max;
  memoized.timeout = 0;

  Object.setPrototypeOf(memoized, Memoized.prototype);
  return memoized;
}

util.inherits(Memoized, Function);

Memoized.prototype.clear = function() {
  this.cache.clear();
  return this;
}

Memoized.prototype.add = function(args, record) {
  const key = generateKey(args);
  this.cache.set(key, record);
  if (this.timeout > 0) {
    setTimeout(() => {
      this.cache.delete(key);
    }, this.timeout);
  }
  return this;
}

Memoized.prototype.delete = function(args) {
  const key = generateKey(args);
  this.cache.delete(key);
  return this;
}

Memoized.prototype.get = function(args) {
  const key = generateKey(args);
  return this.cache.get(key);
};

Memoized.prototype.setTimeout = function(msecs) {
  this.timeout = msecs;
  return this;
}


// Benhmark
//
//
const LOOP_COUNT = 10000;

const speedTest = (name, fn, args, count) => {
  const tmp = [];
  const start = new Date().getTime();
  for (let i = 0; i < count; i++) {
    tmp.push(fn(...args));
  }
  const end = new Date().getTime();
  const time = end - start;
  console.log(`${name} * ${tmp.length} : ${time}`);
};

// Usage
//
//
let fib = (n) => (
  (n <= 2) ? 1 : fib(n - 1) + fib(n - 2)
);

fib = new Memoized(fib);

// fib(20);
// console.log('cache:', fib.cache);
//
// const backup = fib.get([20]);
// console.log('backup:', backup);
//
// fib.clear();
// console.log('cleared cache:', fib.cache);
//
// fib.add([20], backup);
// console.log('backuped:', fib.cache);
//
// fib.delete([20]);
// console.log('deleted:', fib.cache);
//
// fib.setTimeout(10);
// fib(10);
//
// setTimeout(() => fib.add([11], 89), 5);
// setTimeout(() => console.log('timedout(11 msecs):', fib.cache), 11);
// setTimeout(() => console.log('timedout(17 msecs):', fib.cache), 17);
