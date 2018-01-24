'use strict';

const mongo = require('./mongo.js');
const log = require('./log.js');

const clearSession = (sessionId, SESSION_DELAY) => {
  const now = new Date().getTime();
  mongo.getUserLastReq(sessionId, (err, user) => {
    if (!user) return;
    const diff = now - user.lastRequest;
    if (diff > SESSION_DELAY - 100) {
      const update = { $set: { sessionId: null } };
      mongo.updateUser(user, update, (err) => {
        if (err) log.error(err);
      });
    }
  });
};

module.exports = clearSession;
