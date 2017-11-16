'use strict';

// getting week: {1, 2}

Date.prototype.getWeek = function() {
    let firstDay = new Date(this.getFullYear(), 0, 1);
    let MSECS = 86400000;
    return Math.ceil(((this - firstDay) / MSECS) / 7);
};

let day = new Date().getDay();
const week = 2 - (new Date().getWeek() % 2);

// output

exports.writeTimetable = (data) => {
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
