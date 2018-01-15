'use strict';

const parseDate = (date) => {
  const timeUnits = date.split('.');
  return new Date(...timeUnits.reverse()).toString();
};

const parseDataSet = (data) => {
  const dates = data['Дата'];
  const events =  data['Концерт'];
  const time = data['Время'];
  const prices = data['Стоимость'];
  const parsed = new Map();

  for (const i in dates) {
    const parsedDate = parseDate(dates[i]);
    const eventInfo = {
      event: events[i],
      time: time[i],
      price: prices[i]
    };
    parsed.set(parsedDate, eventInfo);
  }

  return parsed;
};

module.exports = parseDataSet;
