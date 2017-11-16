'use strict';

const https = require('https');
const output = require(__dirname + '/output.js');

// getting data by id

const getTimetable = (id) => {
  const url = 'https://api.rozklad.hub.kpi.ua/groups/'+ id + '/timetable/';
  https.get(url, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        output.writeTimetable(parsedData['data']);
      } catch (e) {
        console.error(e.message);
      }
    });
  });
}

// encode kytylic symbols

const encode = (string) => {
  const stringEnc = encodeURIComponent(string);
  return stringEnc;
}

// getting id for entered group name

exports.getId = (group) => {
  const groupEnc = encode(group);
  const url = 'https://api.rozklad.hub.kpi.ua/groups/?name=' + groupEnc;
  https.get(url, (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    let parsedData;
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        parsedData = JSON.parse(rawData);
        const id = parsedData['results'][0]['id'];
        getTimetable(id);
      } catch (e) {
        console.error(e.message);
      }
    });
  });
}
