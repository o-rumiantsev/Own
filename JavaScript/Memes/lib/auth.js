'use strict';

const mongo = require('./mongo.js');
const cryptify = require('./cryptify.js');

const enticate = (credentials, callback) => {
  const login = credentials.login;
  const password = cryptify(credentials);
  mongo.authenticate(login, password, (err, authenticated) => {
    if (!authenticated) {
      const regStatus = 'user';
      callback(err, { sessionId: null, regStatus });
      return;
    } else {
      callback(err, authenticated);
      return;
    }
  });
};

const register = (credentials, callback) => {
  const login = credentials.login;
  const password = cryptify(credentials);
  mongo.register(login, password, callback);
};

const checkAvailability = (sessionId, callback) => {
  mongo.getUser(sessionId, (err, user) => {
    if (!user) callback(new Error('Not authorized'));
    else if (user.regStatus !== 'admin') callback(new Error('Not admin'));
    else callback(null);
  });
};

const admin = (admin, callback) => {
  const login = admin.login;
  const password = cryptify(admin);
  mongo.admin(login, password, callback);
};

module.exports = {
  enticate,
  register,
  checkAvailability,
  admin
};
