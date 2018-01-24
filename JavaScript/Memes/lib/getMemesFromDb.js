'use strict';

const mongo = require('./mongo.js');
const MAX_VIEWS = 10;

let counter = 0;
const chosenMemes = [];
const cache = new Set();

const randomize = (max) => {
  const res = Math.floor(Math.random() * max);
  if (cache.has(res)) randomize(max);
  else cache.add(res);
  return res;
};


const getMemesFromDb = (sessionId, callback) => {
  if (!sessionId) {
    callback(new Error('sessionId argument required'));
    return;
  }

  mongo.countOfMemes((err, count) => {
    if (err) {
      callback(err);
      return;
    }
    mongo.getUser(sessionId, (err, user) => {
      if (err) {
        callback(err);
        return;
      }
      if (!user) {
        callback(new Error('Not authorized'));
        return;
      }
      mongo.getMemes((err, memes) => {
        const generateMeme = () => {
          const index = randomize(count);
          let chosenMeme = memes[index];
          user.memes.forEach((meme) => {
            if (meme._id === chosenMeme._id) {
              chosenMeme = meme;
              return;
            }
          });

          if (chosenMeme.views && chosenMeme.views > MAX_VIEWS) {
            generateMeme();
            return;
          }

          if (counter === 2) {
            callback(null, chosenMemes);
            chosenMemes.splice(0);
            cache.clear();
            counter = 0;
            return;
          } else {
            chosenMemes.push(chosenMeme);
            ++counter;
            generateMeme();
            return;
          }
        };

        generateMeme();
      });
    });
  });
};

module.exports = getMemesFromDb;
