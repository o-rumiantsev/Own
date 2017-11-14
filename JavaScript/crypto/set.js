'use strict';

const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let Users = {};

const data = fs.readFileSync('./instance.json', 'utf8');
if (data) Users = JSON.parse(data);

const set = (username, password) => {
  const hash = crypto.createHmac('sha256', username)
                     .update(password)
                     .digest('hex');
  Users[username] = { pass: hash};
}

// Usage

rl.question('Set new username: ', (username) => {
  Object.keys(Users).forEach(key => {
    if (username === key) throw 'Username already exist.';
  });
  rl.question('Set new password: ', (password) => {
    set(username, password);
    const data = JSON.stringify(Users, null, 2);
    fs.writeFile('./instance.json', data, 'utf8'  , (err) => {
      if (err) throw err;
      else console.log('Password set successfully.');
    })
    rl.close()
  });
});
