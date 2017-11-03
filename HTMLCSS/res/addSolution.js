
// addSolution
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
