'use strict';

const auth = require('./auth.js');
const mongo = require('./mongo.js');
const log = require('./log.js');

const admin = {
  login: 'admin',
  password: 'admin'
};

const insertAdmin = () => {
  mongo.getUserByLogin(admin.login, (err, user) => {
    if (err) {
      log.error(err);
      return;
    }

    if (user) return;

    auth.admin(admin, (err) => {
      if (err) log.error(err);
    });
  });
};

module.exports = insertAdmin;
