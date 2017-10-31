'use strict';

//exports to iteration.js
exports.deleteSimilar = (Obj) => {

    for (const i in Obj) {
      if (Obj[i] !== undefined) {
        let amountOfImplics = Obj[i].length;
        for (let j = 0; j < amountOfImplics - 1; ++j) {
          const currentStr = Obj[i][j];
          const condition1 = currentStr !== undefined
          for (let k = j + 1; k < amountOfImplics; ++k) {
            const comparingStr = Obj[i][k];
            const condition2 = comparingStr !== undefined
            if (currentStr === comparingStr && condition1 && condition2) {
              Obj[i].splice(k, 1);
              exports.deleteSimilar(Obj);
            }
          }
        }
      }
    }

    // Recheck, to find similar implicants, which hadn't been deleted
    // for (const i in Obj) {
    //   if (Obj[i] !== undefined) {
    //     const amountOfImplics = Obj[i].length;
    //     for (let j = 0; j < amountOfImplics - 1; ++j) {
    //       const currentStr = Obj[i][j];
    //       for (let k = j + 1; k < amountOfImplics; ++k) {
    //         const comparingStr = Obj[i][k];
    //         if (currentStr === comparingStr) {
    //           exports.deleteSimilar(Obj);
    //         }
    //       }
    //     }
    //   }
    // }

    return Obj;
  };

// exports to separation.js
exports.checkBeenUsed = (arr) => {
  const newArr = arr.map(implic => implic + 'x');
  return newArr;
};
