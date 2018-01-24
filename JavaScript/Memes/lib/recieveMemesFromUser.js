'use strict';

const mongo = require('./mongo.js');
const rating = require('./rating.js');

const calculateDelta = (oldMeme, newMeme) => {
  const oldRating = oldMeme.rating;
  const newRating = newMeme.rating;
  return newRating - oldRating;
};

const cbCounter = (callback) => {
  let counter = 0;
  return (err, result) => {
    if (++counter === 2) callback(err, result);
  };
};

const recieveMemesFromUser = (request, callback) => {
  const sessionId = request.body.sessionId;
  const memesInfo = request.body.data;
  mongo.getUser(sessionId, (err, user) => {
    if (!user) {
      callback(new Error('Not authorized'));
      return;
    }
    const updatedMemes = rating.calculate(user, memesInfo);
    const userUpdate = rating.updateForUser(user, updatedMemes);
    mongo.updateUser(user, userUpdate, (err) => {
      if (err) callback(err);
    });
    const memes = rating.getUserMemes(user, memesInfo);
    const cb = cbCounter(callback);
    updatedMemes.map((updatedMeme) => {
      let newUser = true;
      let delta = updatedMeme.rating;
      if (memes[updatedMeme._id]) {
        newUser = false;
        delta = calculateDelta(memes[updatedMeme._id], updatedMeme);
      }
      mongo.getMeme(updatedMeme._id, (err, meme) => {
        const memeUpdate = rating.updateTotal(meme, delta, newUser);
        mongo.updateMeme(meme._id, memeUpdate, (err, result) => {
          if (err) cb(err);
          else {
            cb(err, result);
          }
        });
      });
    });
  });
};

module.exports = recieveMemesFromUser;
