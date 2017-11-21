'use strict';

const fs = require('fs');

// Function.prototype

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
  setTimeout(() => {
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

// Wrapper

const observer = function(type) {
  let fn;
  switch (type) {
    case 'notificator': {
      fn = (data) => console.log(data);
      break;
    }
    case 'logger': {
      fn = (data) => {
        const time = new Date().toString();
        fs.writeFile('./log', `${time}: ${data}\n`, { flag: 'a' }, (err) => {
          if (err) throw err;
        });
      };
      break;
    }
  }
  return fn;
};

module.exports = {
  observer
};
