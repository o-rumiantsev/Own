'use strict';

// 1
//
//
let flatify = (array) => {
  const flat = array.reduce((arr, cur) => {
    if (Array.isArray(cur)) arr.push(...flatify(cur));
    else {
      if (typeof(cur) === 'function') cur = cur();
      arr.push(cur);
    }
    return arr;
  }, []);

  return flat;
}

// 2
//
//
const clear = array => array.filter(item => {
  if (item === null || item === undefined) return false;
  else return true;
});

// 3
//
//
const generateKey = args => (
  args.map(x => x.toString() + ':' + typeof(x)).join('|')
);


const memoize = fn => {
  const cache = new Map();
  return (...args) => {
    console.log(...args);
    const key = generateKey(args);
    const record = cache.get(key);
    if (record) {
      console.log('from cache:', record);
      return record;
    }
    const res = fn(...args);
    cache.set(key, res);
    console.log(res);
    return res;
  };
}


// Usage
//
//

const notFlat = ['hello', ['1', 2, [false, () => 10, ['yes', 'no'], Math.pi]]];

flatify = memoize(flatify);
const notClear = flatify(notFlat);

console.log(notClear);
console.log(clear(notClear));
