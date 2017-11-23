'use strict';

const wrap = require('./wrapper.js');

//Publishers

const Publisher = function() {
  this.observers = new Set();
  this.onceObservers = new Set();
};

Publisher.prototype.send = function(data) {
  this.observers.forEach(fn => fn.call(this, data));
  this.onceObservers.forEach(fn => {
    fn.call(this, data);
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

// Uasge

const pub = new Publisher();
const lisher = new Publisher();

const fn = wrap.observer('notificator');
const f = wrap.observer('logger');
const fnc = wrap.observer();

fn.on(pub).once(lisher);
f.once(pub).on(lisher);
fnc.limited(pub, 1000).once(lisher);

pub.send('info');
lisher.send('notification');
