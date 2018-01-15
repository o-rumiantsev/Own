'use strict';

const fs = require('fs');

const getDataSet = (path) => {
  const data = fs.readFileSync(path);
  const parsed = JSON.parse(data);
  return parsed;
};

module.exports = getDataSet;
