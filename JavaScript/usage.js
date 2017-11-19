'use strict';

const factory = require('./factory.js');

const Rect = {
  x: 0,
  y: 0,
  height: 100,
  width: 50
}


const filer = factory.observe('file', './res.json', null, 1000);
const objecter = factory.observe('object', null, Rect, 1000);

setTimeout(() => {
  Rect.square = Rect.height * Rect.width;
}, 5000);
