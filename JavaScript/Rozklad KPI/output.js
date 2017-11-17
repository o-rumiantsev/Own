'use strict';

const Week = {
  '1': 'Понеділок',
  '2': 'Вівторок',
  '3': 'Середа',
  '4': 'Четвер',
  '5': 'П\'ятниця',
  '6': 'Субота'
};

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
  if (6 <= day) day = 1;
  else day++;

  let tomorrow = data[week][day];
  if (!tomorrow) {
    day = 1;
    tomorrow = data[week][day];
  }

  console.log(`\n\x1b[1;37;3m${Week[day]}\x1b[23m`);

  let order, name, type, rooms, building, teachers;
  for (const i in tomorrow) {
    order = i;
    name = tomorrow[i]['discipline']['name'];
    type = tomorrow[i]['type'];
    type = type === 0 ? 'Лекція' :
           type === 1 ? 'Практика' :
           type === 2 ? 'Лабораторна' : '';
    rooms = tomorrow[i]['rooms'];
    building = '';
    if (rooms[0]) {
      rooms = `${rooms.map(room => room['name'])
                   .toString()
                   .replace(/,/g, '$& ')}-`;
      building = tomorrow[i]['rooms'][0]['building']['name'];
    } else rooms = '';
    teachers = tomorrow[i]['teachers'];
    if (teachers[0]) {
      teachers = teachers.map(teacher => teacher['full_name'])
                         .toString()
                         .replace(/,/g, '$& ');
    } else teachers = '';
    console.log(
      `\n\x1b[1;37m${order}) \x1b[1;37m${name} \t ${type} \t ${rooms}${building}`
      );
    if (teachers !== '') console.log(
      `\x1b[30;3mВикладачі: ${teachers}\x1b[23m`
      );
  }
}
