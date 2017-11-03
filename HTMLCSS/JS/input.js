
// main
function input() {
  const ddnf = document.getElementById('input').value;
  toGroups(ddnf);
}
// separation
function toGroups(string) {
  const implics = string.split(' ');
  const group = generateGroup();
  const unUsedImplics = checkBeenUsed(implics);
  // add 'x' to unused implicants
  for (let i = 1; i < implics.length; ++i) {
    if (implics[i].length !== implics[0].length) {
      alert(
        `\nError(${i + 1}): не ДДНФ (не всі імпліканти конституенти одиниці)`
      );
      return;
    }
  }

  for (let i = 0; i < implics.length; ++i) {
    if (implics[i].match(/1/g) === null) {
      group('0', unUsedImplics[i]);
    } else {
      group(implics[i].match(/1/g).length, unUsedImplics[i]);
    }
  }

  const Groups = group();
  delete Groups.undefined;

  makeNextIterationGroups(Groups, 0);
};
// iteration
const solution = addSolution();

function makeNextIterationGroups(Obj, number) {

  countOfDash = number + 1;
  const nextIterationGroup = generateGroup();
  const amountOfGroups = Object.keys(Obj).length - 1;

  for (let i = 0; i < amountOfGroups; ++i) {
    const currentFieldName = Object.keys(Obj)[i];
    const nextFieldName = Object.keys(Obj)[i + 1];
    const currentGroup = Obj[currentFieldName];
    const nextGroup = Obj[nextFieldName];
    for (const j in currentGroup) {
      for (const k in nextGroup) {
        const comparedImplic = findDiffPos(
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

  deleteSimilar(Obj);

  for (const i in Obj) {
    for (const j in Obj[i]) {
      if (Obj[i][j].includes('x')) {
        solution(Obj[i][j], 0);
      }
    }
  }

  const NextIterationGroups = nextIterationGroup();
  delete NextIterationGroups.undefined;
  deleteSimilar(NextIterationGroups);

  if (Object.keys(NextIterationGroups).length > 0) {
    makeNextIterationGroups(NextIterationGroups, countOfDash);
  } else {
    countOfDash = 0;
    const result = solution('', 0);
    result.pop();
    writeSolution(result);
    solution('', 1);
  }
};
// compare
function findDiffPos(str1, str2, countOfDash) {
  const str3 = [''];

  for (let i = 0; i < str1.length - 1; ++i) {
    if (str1[i] === str2[i]) {
      str3.push(str1[i]);
    } else if ((str1[i] !== '-') && (str2[i] !== '-')) {
      str3.push('-');
    }
  }

  str3.push('x');

  const resultStr = str3.toString().replace(/,/g, '');
  if (resultStr.length < str1.length) {
    return undefined;
  }

  try {
    if (resultStr.match(/-/g).length !== countOfDash) {
      return undefined;
    } else {
      return resultStr;
    }
  } catch (e) {}
};
// sortGroup
function deleteSimilar(Obj) {

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
              deleteSimilar(Obj);
            }
          }
        }
      }
    }

    return Obj;
};

function checkBeenUsed(arr) {
  const newArr = arr.map(implic => implic + 'x');
  return newArr;
};
// hash
function generateGroup() {
  const data = {};
  return (key, value) => {
    if (data[key] !== undefined) {
      data[key].push(value);
    } else {
      data[key] = [value];
    }
    return data;
  };
};

function addSolution() {
  let res = [];
  return (value, condition) => {
    if (condition === 0) {
      res.push(value);
    } else {
      res = [];
    }
    return res;
  };
};
// output
function writeSolution(arr) {
  const res = arr
    .toString()
    .replace(/x/g, '')
    .replace(/,/g, ' V ');
  document.getElementById('solution').innerHTML = `СДНФ: ${res}`;
};
