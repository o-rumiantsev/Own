'use strict';

const curry = fn =>
  (...args) =>
    fn.length > args.length ?
     curry(fn.bind(null, ...args)) : fn(...args);

const all = (fns, context = {}) => callback => {
  const length = fns.length;
  let counter = 0;

  for (const fn of fns) {
    const cb = (err, res) => {
      if (err) {
        cb(err);
        return;
      }
      Object.assign(context, res);
      if (++counter === length) callback(null, context);
    };
    const args = [cb];
    if (fn.length >= 2) args.unshift(context);
    fn(...args);
  }
};

const waiter = generator => cb => {
  const iterator = generator(all, curry);
  const iteration = iterator.next();

  const next = iteration => {
    const { value: f } = iteration;
    f((err, result) => {
      if (err) {
        cb(err);
        iterator.return();
        return;
      }
      iteration = iterator.next(result);
      if (iteration.done) cb(null, iteration.value);
      else next(iteration);
    });
  };

  next(iteration);
};

module.exports = waiter;
