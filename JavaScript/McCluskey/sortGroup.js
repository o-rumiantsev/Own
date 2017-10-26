'use strict';

exports.deleteSimilar = (Obj) => {

  for ( let i in Obj){
    if (Obj[i] !== undefined) {
      let amountOfImplics = Obj[i].length;
      for ( let j = 0; j < amountOfImplics - 1; ++j) {
        for (let k = j + 1; k < amountOfImplics; ++k) {
          if (Obj[i][j] === Obj[i][k]) {
            Obj[i].splice(k,1);
          }
        }
      }
    }
  }

  // Recheck, to find similar implicants, which hadn't been deleted
  for ( let i in Obj){
    if (Obj[i] !== undefined) {
      let amountOfImplics = Obj[i].length;
      for ( let j = 0; j < amountOfImplics - 1; ++j) {
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
}

// deleteSimilar(S);
// console.log({S});
exports.checkBeenUsed = (arr) => {
  const newArr = arr.map(implic => implic + 'x');
  return newArr;
}
