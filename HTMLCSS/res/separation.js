
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

  wrap(Groups, 0);
};
