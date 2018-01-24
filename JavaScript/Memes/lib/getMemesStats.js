'use strict';

const mongo = require('./mongo.js');

const getMemesStats = (callback) => {
  mongo.getMemes((err, memes) => {
    const sortedMemes = memes.filter((meme) => {
      if (meme.rating > 0) return true;
      return false;
    });
    callback(err, sortedMemes);
  });
};

module.exports = getMemesStats;
