'use strict';

const getDataSet = require('./getDataSet.js');
const parseDataSet = require('./parseDataSet.js');
const readFromConsole = require('./readFromConsole.js');
const writeToConsole = require('./writeToConsole.js');

const data = getDataSet('./data.json');
const parsed = parseDataSet(data);

const parseDate = (date) => {
  const timeUnits = date.split('.');
  return new Date(...timeUnits.reverse()).toString();
};

readFromConsole((date) => {
  const parsedDate = parseDate(date);
  const eventInfo = parsed.get(parsedDate);
  writeToConsole(parsedDate, eventInfo);
});
