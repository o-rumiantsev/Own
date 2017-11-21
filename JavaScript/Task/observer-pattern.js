'use strict';

const wrap = require('./wrapper.js');

//Publishers

const Publisher = function() {
  this.observers = new Set();
  this.onceObservers = new Set();
};

Publisher.prototype.send = function(data) {
  this.observers.forEach(fn => fn(data));
  this.onceObservers.forEach(fn => {
    fn(data);
    this.onceObservers.delete(fn);
  });
  return this;
};

Publisher.prototype.unsubscribeAll = function() {
  this.observers.clear();
  this.onceObservers.clear();
  return this;
};

Publisher.prototype.count = function() {
  return this.observers.size + this.onceObservers.size;
};

const pub = new Publisher();
const lisher = new Publisher();

const fn = wrap.observer('notificator');
const f = wrap.observer('logger');

fn.on(pub).once(lisher);
f.once(pub).on(lisher);

pub.send('info').unsubscribeAll();
