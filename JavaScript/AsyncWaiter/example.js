'use strict';

const fs = require('fs');
const waiter = require('./waiter');

// Simple extracting from callback
const f1 = waiter(function *() {
  const a = yield cb => cb(null, 10);
  const b = yield cb => cb(null, 20);
  return a + b;
});

f1(console.log); // null 30

// Extracting from asynchronous function,
// returned value to callback
const f2 = waiter(function *(all, curry) {
  const data = yield curry(fs.readFile)('./waiter.js', 'utf8');
  return data;
});

f2(console.log); // null '\'use strict\'; ... \nmodule.exports = waiter;\n'

// Error handling
const f3 = waiter(function *(all, curry) {
  const data = curry(fs.readFile)('./not_existing_file.ext', 'utf8');
  return data;
});

f3(console.error); // Error: ENOENT: no such file or directory, open './not_existing_file.ext'

const f4 = waiter(function *(all) {
  const filesdata = yield all([
    (context, cb) =>
      fs.readFile('./waiter.js', (err, buffer) => cb(err, { waiter: buffer })),
    (context, cb) =>
      fs.readFile('./example.js', (err, buffer) =>
        cb(err, { example: buffer })
      )
  ]);

  return filesdata;
});

f4(console.log);
