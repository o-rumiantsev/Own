'use strict';

const getMemesStats = require('../lib/getMemesStats.js');

const appGet = () => {
  getMemesStats((err, memes) => {
    console.log(err, memes);
  });
};

appGet();
