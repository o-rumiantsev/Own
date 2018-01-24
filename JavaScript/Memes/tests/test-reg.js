'use strict';

const auth = require('../lib/auth.js');
const log = require('../lib/log.js');

const req = {
  body: {
    credentials: {
      login: 'Oleksii',
      password: '1111'
    }
  }
};


const appPost = (req) => {
  const credentials = req.body.credentials;
  auth.register(credentials, (err, registered) => {
    if (err) {
      // res.sendStatus(500);
      log.error(err);
    } else  console.log(registered); //res.send(registered);
  });
};

appPost(req);
