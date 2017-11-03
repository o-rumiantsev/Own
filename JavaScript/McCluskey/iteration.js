'use strict';

const hash = require('./hash.js');
const compare = require('./compare.js');
const sortGroup = require('./sortGroup.js');
const output = require('./output.js');

let countOfDash = 0;
const solution = hash.addSolution();

// exports to separation.js
exports.makeNextIterationGroups = (Obj) => {

  ++countOfDash;
  const nextIterationGroup = hash.generateGroup();
  const amountOfGroups = Object.keys(Obj).length - 1;

  for (let i = 0; i < amountOfGroups; ++i) {
    const currentFieldName = Object.keys(Obj)[i];
    const nextFieldName = Object.keys(Obj)[i + 1];
    const currentGroup = Obj[currentFieldName];
    const nextGroup = Obj[nextFieldName];
    for (const j in currentGroup) {
      for (const k in nextGroup) {
        const comparedImplic = compare.findDiffPos(
          currentGroup[j], nextGroup[k], countOfDash
        );
        if (comparedImplic !== undefined) {
          currentGroup[j] = currentGroup[j].replace('x', '+');
          nextGroup[k] = nextGroup[k].replace('x', '+');
          nextIterationGroup(currentFieldName, comparedImplic);
        }
      }
    }
  }

  sortGroup.deleteSimilar(Obj);

  for (const i in Obj) {
    for (const j in Obj[i]) {
      if (Obj[i][j].includes('x')) {
        solution(Obj[i][j], 0);
      }
    }
  }

  const NextIterationGroups = nextIterationGroup();
  delete NextIterationGroups.undefined;
  sortGroup.deleteSimilar(NextIterationGroups);

  if (Object.keys(NextIterationGroups).length > 0) {
    exports.makeNextIterationGroups(NextIterationGroups);
  } else {
    countOfDash = 0;
    const result = solution('', 0);
    result.pop();
    output.writeSolution(result);
    solution('', 1);
  }
};
