'use strict';

const auth = require('../lib/auth.js');
const mongo = require('../lib/mongo.js');
const clearSession = require('../lib/clearSession.js');
const SESSION_DELAY = 5000;

const req = {
  body: {
    credentials: {
      login: 'Maksim',
      password: '1111'
    }
  }
};

const appPost = ((req) => {
  const credentials = req.body.credentials;
  auth.enticate(credentials, (err, authenticated) => {
    if (err) console.error(err);
    else {
      console.log(authenticated);
      const sessionId = authenticated.sessionId;
      setTimeout(() => clearSession(sessionId, SESSION_DELAY), SESSION_DELAY);
      mongo.getUserByLogin('Maksim', (err, user) => {
        console.log(user);
      });
      setTimeout(() => mongo.getUserByLogin('Maksim', (err, user) => {
        console.log(user);
      }), SESSION_DELAY * 2);
    }
  });
});

appPost(req);
