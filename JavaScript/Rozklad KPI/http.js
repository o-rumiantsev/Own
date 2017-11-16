'use strict';

const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

Date.prototype.getWeek = function() {
    let firstDay = new Date(this.getFullYear(), 0, 1);
    let MSECS = 86400000;
    return Math.ceil(((this - firstDay) / MSECS) / 7);
};

let day = new Date().getDay();
const week = 2 - (new Date().getWeek() % 2);

const writeTimetable = (data) => {
  if (day >= 6) day = 1;
  else day++;
  const tomorrow = data[week][day];
  for (const i in tomorrow) {
    const order = i;
    const name = tomorrow[i]['discipline']['name'];
    let type = tomorrow[i]['type'];
    type = type === 0 ? ', Лекція, ' :
           type === 1 ? ', Практика, ' :
           type === 2 ? ', Лабораторна, ' : '';
    let rooms = tomorrow[i]['rooms'];
    let building = '';
    if (rooms[0]) {
      rooms = `${rooms.map(room => room['name'])
                   .toString()
                   .replace(/,/g, '$& ')}-`;
      building = tomorrow[i]['rooms'][0]['building']['name'];
    } else rooms = '';
    let teachers = tomorrow[i]['teachers'];
    if (teachers[0]) {
      teachers = teachers.map(teacher => teacher['full_name'])
                         .toString()
                         .replace(/,/g, '$& ');
    } else teachers = '';
    console.log(`\n${order}) ${name}${type}${rooms}${building}`);
    if (teachers !== '') console.log(`Викладачі: ${teachers}`);
  }
}

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
        writeTimetable(parsedData['data']);
      } catch (e) {
        console.error(e.message);
      }
    });
  });
}

const encode = (string) => {
  const stringEnc = encodeURIComponent(string);
  return stringEnc;
}

const getId = (group) => {
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


const askGroup = () => {
  rl.question('Введіть назву группи: ', (group) => {
    getId(group);
    rl.close()
  });
}

// Usage

askGroup();
