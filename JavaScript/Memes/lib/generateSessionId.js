'use strict';

const uuidv4 = require('uuid/v4');

const generateSessionId = () => {
  const token = uuidv4();
  return token;
};

module.exports = generateSessionId;
