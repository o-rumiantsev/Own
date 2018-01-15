'use strict';

const fs = require('fs');

const logToFile = (err, requestedDate) => {
  const date = new Date().toString();
  const log = `${date}: requested for ${requestedDate}. Error: ${err}\n`;
  fs.writeFile('./logs.txt', log, { flag: 'a' }, (err) => {
    if (err) throw err.message;
  });
};

const writeToConsole = (requestedDate, eventInfo) => {
  if (!eventInfo || !eventInfo['event']) {
    const error = new Error('No events available');
    console.log(error.message);
    logToFile(error.message, requestedDate);
    return;
  }
  console.log(
    `Концерт: ${eventInfo['event']}\n` +
    `Время: ${eventInfo['time']}\n` +
    `Стоимость:${eventInfo['price']}`
  );
  logToFile(null, requestedDate);
};

module.exports = writeToConsole;
