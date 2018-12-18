'use strict';

const curry = fn =>
  (...args) =>
    fn.length > args.length ?
     curry(fn.bind(null, ...args)) : fn(...args);

const waiter = fn => cb => {
  const generator = fn(curry);
  const iteration = generator.next();

  const next = iteration => {
    const { value: f } = iteration;
    f((err, result) => {
      if (err) {
        generator.throw(err);
        return;
      }
      iteration = generator.next(result);
      if (iteration.done) cb(null, iteration.value);
      else next(iteration);
    });
  };

  next(iteration);
};

module.exports = waiter;
