'use strict';

const auth = require('../lib/auth.js');
const log = require('../lib/log.js');

const req = {
  body: {
    credentials: {
      login: 'Maksim',
      password: '0000'
      //210b64cba5174567eb473837e7d1bfeb8a52a1bda196068ec51fb7aba8891aa0
    }
  }
};

const appPost = ((req) => {
  const credentials = req.body.credentials;
  auth.enticate(credentials, (err, authenticated) => {
    if (err) {
      // res.sendStatus(500);
      log.error(err);
    } else  console.log(authenticated); //res.send(authenticated);
  });
});

appPost(req);
