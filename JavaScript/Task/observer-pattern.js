'use strict';

// const types = require('./types.js');

//Publishers

const Publisher = function() {
  this.observers = new Set();
  this.onceObservers = new Set();
}

Publisher.prototype.send = function(data) {
  this.observers.forEach(fn => fn(data));
  this.onceObservers.forEach(fn => {
    fn(data);
    this.onceObservers.delete(fn);
  });
  return this;
}

Publisher.prototype.unsubscribeAll = function() {
  this.observers.clear();
  this.onceObservers.clear();
  return this;
};

Publisher.prototype.count = function() {
  return this.observers.size + this.onceObservers.size;
};

// Functions

Function.prototype.on = function(publisher) {
  publisher.observers.add(this);
  return this;
};

Function.prototype.once = function(publisher) {
  publisher.onceObservers.add(this);
  return this;
};

Function.prototype.limited = function(publisher, timeout) {
  this.on(publisher);
  const Observer = this;
  setTimeout(function() {
    Observer.unsubscribe(publisher);
  }, timeout);
  return this;
};

Function.prototype.unsubscribe = function(publisher) {
  const fn = this;
  publisher.observers.forEach(observer => {
    if (observer === fn) {
      publisher.observers.delete(fn);
      return;
    }
  });
  publisher.onceObservers.forEach(observer => {
    if (observer === fn) {
      publisher.onceObservers.delete(fn);
      return;
    }
  });
  return this;
};


const pub = new Publisher();
const lisher = new Publisher();

const fn = (data) => {
  console.log('fn: ' + data);
};
const f = (data) => {
  console.log('f: ' + data)
};

fn.on(pub).once(lisher);
f.once(pub).on(lisher);
console.dir({ pub });
console.dir({ lisher });

pub.send('\ninfo\n').unsubscribeAll();
console.dir({ pub });
console.dir({ lisher });
console.log(pub.count(), lisher.count());
