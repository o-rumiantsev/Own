'use strict';

const hash = require('./hash.js');
const iteration = require('./iteration.js');
const sortGroup = require('./sortGroup.js');


exports.toGroups = (ddnf) => {
  // toGroups(str) separate implicants in groups by amount of '1'

  const implics = ddnf.split(' ');   // create an array of implicants
  const group = hash.generateGroup();
  const unUsedImplics = sortGroup.checkBeenUsed(implics); // add 'x' to unused
                                                          // implicants
  for (let i = 1; i < implics.length; ++i) {
    // comparing all next implicants with the first
    if(implics[i].length !== implics[0].length) {
      console.log(
        `\nError(${i + 1}): не ДДНФ (не всі іпліканти конституенти одиниці)`
      );
      return;
    }
  };


  for (let i = 0; i < implics.length; ++i) {
    if (implics[i].match(/1/g) === null) {
      group('0', unUsedImplics[i]);
    } else {
      group(implics[i].match(/1/g).length, unUsedImplics[i]);
    }
  };

  const Groups = group();
  delete Groups.undefined;

  iteration.makeNextIterationGroups(Groups);
}
