'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const auth = require('./lib/auth.js');
const log = require('./lib/log.js');
const getMemesStats = require('./lib/getMemesStats.js');
const getMemesFromDb = require('./lib/getMemesFromDb.js');
const recieveMemesFromUser = require('./lib/recieveMemesFromUser.js');
const clearSession = require('./lib/clearSession.js');
const updateDb = require('./lib/updateDb.js');
const insertAdmin = require('./lib/insertAdmin.js');
const SESSION_DELAY = 1800000;

const app = express();
insertAdmin();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(express.urlencoded());



app.get('/', (req, res) => {
  console.log('/');
  res.send('Here will be our Meme Time');
});



app.get('/getMemesStats', (req, res) => {
  console.log('/getMemesStats');
  getMemesStats((err, memes) => {
    if (err) {
      res.sendStatus(500);
      log.error(err);
    } else res.json({ memes });
  });
});



app.post('/handleRegistration', (req, res) => {
  console.log('/handleRegistration');
  const credentials = req.body.credentials;
  auth.register(credentials, (err, registrated) => {
    if (err) {
      if (err.message === 'Username already exist') {
        res.status(500).json(err);
        log.error(err);
      } else {
        res.sendStatus(500);
        log.error(err);
      }
    } else {
      res.send(registrated);
      const sessionId = registrated.sessionId;
      setTimeout(() => clearSession(sessionId, SESSION_DELAY), SESSION_DELAY);
    }
  });
});



app.post('/loginVerify', (req, res) => {
  console.log('/loginVerify');
  const credentials = req.body.credentials;
  auth.enticate(credentials, (err, authenticated) => {
    if (err) {
      res.sendStatus(500);
      log.error(err);
    } else {
      res.json({ authenticated });
      setTimeout(() =>
        clearSession(authenticated.sessionId, SESSION_DELAY),
      SESSION_DELAY);
    }
  });
});



app.post('/getMemes', (req, res) => {
  console.log('/getMemes');
  const sessionId = req.body.sessionId;
  if (req.body.data) recieveMemesFromUser(req, (err) => {
    if (err) {
      res.json({ error: true, message: err.message });
      log.error(err);
    } else sendMemes(res, sessionId);
  });
  else sendMemes(res, sessionId);
});



app.post('/updateMemesDb', (req, res) => {
  console.log('/updateMemesDb');
  const sessionId = req.body.sessionId;
  auth.checkAvailability(sessionId, (err) => {
    if (err) res.sendStatus(500);
    else {
      res.sendStatus(200);
      updateDb();
    }
  });
});

app.listen(80, '0.0.0.0');

function sendMemes(res, sessionId) {
  getMemesFromDb(sessionId, (err, memes) => {
    if (err) {
      res.json({ error: true, message: err.message });
      log.error(err);
    } else {
      const frontMemes = memes.map(
        (meme) => ({
          _id: meme._id,
          url: meme.url
        })
      );
      res.json({ frontMemes }).end();
      setTimeout(() => clearSession(sessionId, SESSION_DELAY), SESSION_DELAY);
    }
  });
}
