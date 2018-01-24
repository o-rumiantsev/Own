'use strict';

const mongo = require('./mongo.js');
const downloadMemes = require('./downloadMemes.js');

const parseMemes = (memes) => {
  memes.forEach((meme) => {
    delete meme.width;
    delete meme.height;
    meme.rating = 0;
    meme.usersWatched = 0;
  });
};

const updateDb = (callback) => {
  downloadMemes((newMemes) => {
    parseMemes(newMemes);
    mongo.getMemes((err, memes) => {
      if (memes.length === 0) mongo.addMemes(newMemes, callback);
      else {
        const uniqMemes = newMemes.filter((meme) => {
          for (const i in memes) {
            if (meme.url === memes[i].url) return false;
          }
          return true;
        });
        if (uniqMemes.length > 0) mongo.addMemes(uniqMemes, callback);
        else callback(null, { result: 'Everything up to date' });
      }
    });
  });
};

module.exports = updateDb;
