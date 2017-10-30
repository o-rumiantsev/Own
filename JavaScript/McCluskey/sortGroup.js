'use strict';

//exports to iteration.js
exports.deleteSimilar = (Obj) => {

  for (const i in Obj) {
    if (Obj[i] !== undefined) {
      const amountOfImplics = Obj[i].length;
      for (let j = 0; j < amountOfImplics - 1; ++j) {
        for (let k = j + 1; k < amountOfImplics; ++k) {
          if (Obj[i][j] === Obj[i][k]) {
            Obj[i].splice(k, 1);
          }
        }
      }
    }
  }

  // Recheck, to find similar implicants, which hadn't been deleted
  for (const i in Obj) {
    if (Obj[i] !== undefined) {
      const amountOfImplics = Obj[i].length;
      for (let j = 0; j < amountOfImplics - 1; ++j) {
        const currentStr = Obj[i][j];
        for (let k = j + 1; k < amountOfImplics; ++k) {
          const comparingStr = Obj[i][k];
          if (currentStr === comparingStr) {
            exports.deleteSimilar(Obj);
          }
        }
      }
    }
  }

  return Obj;
};

// exports to separation.js
exports.checkBeenUsed = (arr) => {
  const newArr = arr.map(implic => implic + 'x');
  return newArr;
};
