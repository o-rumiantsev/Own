'use strict';

const Subject = function() {
  this.observers = [[], []];
}

Subject.prototype = {
  on: function(name, context, fn) {
    for (const i in this.observers[0]) {
      if (this.observers[0][i]['name'] === name) return;
    }
    const observer = {};
    observer['name'] = name;
    observer['callback'] = fn.bind(context);
    this.observers[0].push(observer);
  },
  once: function(name, context, fn) {
    for (const i in this.observers[1]) {
      if (this.observers[1][i]['name'] === name) return;
    }
    const vans = {};
    vans['name'] = name;
    vans['callback'] = fn.bind(context);
    this.observers[1].push(vans);
  },
  limited: function(name, context, timeout, fn) {
    this.on(name, context, fn);
    const Observer = this;
    setTimeout(function() {
      Observer.unsubscribe(name)
    }, timeout);
  },
  unsubscribe: function(name) {
    for (const i in this.observers) {
      for (const j in this.observers[i]) {
        if (this.observers[i][j]['name'] === name) {
          this.observers[i].splice(j, 1);
          return;
        }
      }
    }
  },
  unsubscribeAll: function() {
    this.observers.forEach(item => item.splice(0));
  },
  count: function() {
    return this.observers[0].length + this.observers[1].length;
  },
  send: function(name, ...args) {
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
}

// <------------- Usage ------------->

const Rect = {
  x: 10,
  y: 20,
  height: 180,
  width: 50
}

const Obs1 = new Subject();
const Obs2 = new Subject();

Obs1.on('square', Rect, function() {
  this.square = this.height * this.width;
});

Obs2.once('notify', null, function(data) {
  console.log(data);
});

Obs1.limited('move', Rect, 5000, function(x, y) {
  this.x += x;
  this.y += y;
});

console.log(Obs1.observers[0]);

Obs1.send('move', 10, 10);
console.log(Rect);

setTimeout(() => {
  Obs1.send('move', 100, 100);
  console.log(Rect);
  console.log(Obs1.observers[0]);
}, 6000)
