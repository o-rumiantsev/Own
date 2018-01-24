'use strict';

const updateDb = require('../lib/updateDb.js');
const auth = require('../lib/auth.js');

const req = {
  sessionId: 'b75f9b69-7b2d-495d-be42-ff4111f75ade'
};

const appPost = (req) => {
  console.log('/updateMemesDb');
  const sessionId = req.sessionId;
  auth.checkAvailability(sessionId, (err) => {
    if (err) console.log(err);// res.sendStatus(500);
    else {
      console.log('ok');// res.sendStatus(200);
      updateDb((err) => {
        if (err) console.error(err);
      });
    }
  });
};

appPost(req);
