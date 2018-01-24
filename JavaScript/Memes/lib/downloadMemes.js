'use strict';

const https = require('https');
const MEMES_URL = 'https://www.reddit.com/r/memes/.json?limit=100';

const downloadMemes = (callback) => {
  https.get(MEMES_URL, (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      const memes = [];
      const parsed = JSON.parse(data);
      parsed.data.children.map(meme => {
        memes.push(meme.data.preview.images[0].source);
      });
      callback(memes);
    });
  });
};

module.exports = downloadMemes;
