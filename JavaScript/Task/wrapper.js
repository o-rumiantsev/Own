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
  publisher.observers.delete(fn)
  publisher.onceObservers.delete(fn);
  return this;
};

// Wrapper

const observer = function(type) {
  switch (type) {
    case 'notificator': {
      return (data) => console.log(data);
    }
    case 'logger': {
      return (data) => {
        const time = new Date().toString();
        const log = `${time}: ${data};\n`;
        fs.writeFile('./log', log, { flag: 'a' }, (err) => {
          if (err) throw err;
        });
      };
    }
    default: {
      return function(data) {
        console.log(data, this);
      };
    }
  }
};

module.exports = {
  observer
};
