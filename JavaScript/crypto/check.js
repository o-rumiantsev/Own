'use strict';

const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const data = fs.readFileSync('./instance.json', 'utf8');
const Users = JSON.parse(data);

const check = (username, password) => {
  const hash = crypto.createHmac('sha256', username)
                     .update(password)
                     .digest('hex');
  if (Users[username] && hash === Users[username]['pass']) return true;
  else return false;
};

// Usage

rl.question('Enter username: ', (username) => {
  rl.question('Enter password: ', (password) => {
    if (check(username, password)) console.log('You are in.');
    else throw new Error('wrong username or password.');
    rl.close()
  });
});
