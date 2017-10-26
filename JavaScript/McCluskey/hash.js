'use strict';

exports.generateGroup = () => {
  const data = {};
  return (key, value) => {
    if (data[key] !== undefined) {
      data[key].push(value);
    }
    else {
      data[key] = [value];
    }
    return data;
  };
};

exports.addSolution = () => {
  let res = [];
  return (value, condition) => {
    if (condition === 0) {
      res.push(value);
    } else {
      res = [];
    }
    return res;
  };
}
