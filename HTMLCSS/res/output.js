
// output
function writeSolution(arr) {
  const res = arr
    .toString()
    .replace(/x/g, '')
    .replace(/,/g, ' V ');
  document.getElementById('solution').innerHTML = `СДНФ: ${res}`;
};
