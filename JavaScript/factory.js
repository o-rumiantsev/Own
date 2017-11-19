'use strict';

const types = require('./types.js');

const Subject = function() {
  this.observers = [[], []];
};

Subject.prototype = {
  on(name, context, fn) {
    for (const i in this.observers[0]) {
      if (this.observers[0][i]['name'] === name) return;
    }
    const observer = {};
    observer['name'] = name;
    observer['callback'] = fn.bind(context);
    this.observers[0].push(observer);
  },
  once(name, context, fn) {
    for (const i in this.observers[1]) {
      if (this.observers[1][i]['name'] === name) return;
    }
    const vans = {};
    vans['name'] = name;
    vans['callback'] = fn.bind(context);
    this.observers[1].push(vans);
  },
  limited(name, context, timeout, fn) {
    this.on(name, context, fn);
    const Observer = this;
    setTimeout(function() {
      Observer.unsubscribe(name);
    }, timeout);
  },
  unsubscribe(name) {
    for (const i in this.observers) {
      for (const j in this.observers[i]) {
        if (this.observers[i][j]['name'] === name) {
          this.observers[i].splice(j, 1);
          console.log('unsubscribed from: ' + name);
          return;
        }
      }
    }
  },
  unsubscribeAll() {
    this.observers.forEach(item => item.splice(0));
  },
  count() {
    return this.observers[0].length + this.observers[1].length;
  },
  send(name, ...args) {
    for (const i in this.observers) {
      for (const j in this.observers[i]) {
        if (this.observers[i][j]['name'] === name) {
          const fn = this.observers[i][j]['callback'];
          fn(...args);
          if (i === '1') this.unsubscribe(name);
          return;
        }
      }
    }
  }

};

exports.observe = function(type, path, obj, interval) {
  const Obs = new Subject();
  switch (type) {
    case 'file': {
      console.log('subscribed on: ' + path);
      const Observer = types.file(Obs, path, obj, interval);
      return Observer;
    }
    case 'object': {
      console.log(
        'subscribed on object: ' + JSON.stringify(obj, null, 2)
                                       .replace(/"/g, '')
      );
      const Observer = types.object(Obs, obj, interval);
      return Observer;
    }
    default: {
      return Obs;
    }
  }
};
