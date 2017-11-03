
// iteration
function wrap(Obj, number) {
  const solution = addSolution();
  
  makeNextIterationGroups(Obj, number);

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
}
