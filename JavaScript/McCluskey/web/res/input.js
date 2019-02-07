
// main
function input() {
  const ddnf = document.getElementById('input').value;
  const syntaxAnal = ddnf.match(/[10\s]/g);
  if (
    !syntaxAnal || (syntaxAnal.length !== ddnf.length)
  ) {
    alert('ERROR: не ДДНФ\nВведіть ДВІЙКОВІ коди імплікант');
    return;
  }
  toGroups(ddnf);
}
