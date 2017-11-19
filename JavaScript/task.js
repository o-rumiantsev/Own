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
  unsubscribe: function(name) {
    for (const i in this.observers) {
      for (const j in this.observers[i]) {
        if (this.observers[i][j]['name'] === name) {
          this.observers.splice(i, 1);
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
  send: function(name, data) {
    for (const i in this.observers) {
      for (const j in this.observers[i]) {
        if (this.observers[i][j]['name'] === name) {
          const fn = this.observers[i][j]['callback'];
          fn(data);
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

Obs2.on('move', Rect, function() {
  this.x += 10;
  this.y += 10;
});

Obs2.once('notify', null, function(data) {
  console.log(data);
});

Obs1.send('square');
Obs2.send('move');

console.log(Obs2.observers[1]);
Obs2.send('notify', 'first');
Obs2.send('notify', 'second');
