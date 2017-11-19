'use strict';

const Subject = function() {
  this.observers = [];
  this.vans = [];
  this.occured = [];
}

Subject.prototype = {
  on: function(name, context, fn) {
    for (const i in this.observers) {
      if (this.observers[i]['name'] === name) return;
    }
    const observer = {};
    observer['name'] = name;
    observer['callback'] = fn.bind(context);
    this.observers.push(observer);
  },
  once: function(name, context, fn) {
    for (const i in this.vans) {
      if (this.vans[i]['name'] === name) return;
    }
    const vans = {};
    vans['name'] = name;
    vans['callback'] = fn.bind(context);
    this.vans.push(vans);
  },
  unsubscribe: function(name) {
    for (const i in this.observers) {
      if (this.observers[i]['name'] === name) {
        this.observers.splice(i, 1);
        return;
      }
    }
    for (const i in this.vans) {
      if (this.vans[i]['name'] === name) {
        this.vans.splice(i, 1);
      }
    }
  },
  unsubscribeAll: function() {
    this.observers.splice(0);
  },
  count: function() {
    return this.observers.length;
  },
  send: function(name, data) {
    for (const i in this.observers) {
      if (this.observers[i]['name'] === name) {
        const fn = this.observers[i]['callback'];
        fn(data);
        return;
      }
    }
    for (const i in this.vans) {
      if (this.vans[i]['name'] === name) {
        const fn = this.vans[i]['callback'];
        fn(data);
        this.unsubscribe(name);
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

console.log(Obs2);
Obs2.send('notify', 'notification');
console.log(Obs2);
