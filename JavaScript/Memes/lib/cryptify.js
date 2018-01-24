'use strict';

const crypto = require('crypto');

const cryptify = (credentials) => {
  const login = credentials.login;
  const password = credentials.password;
  const hash =
    crypto.createHmac('sha256', login).update(password).digest('hex');
  return hash;
};

module.exports = cryptify;
