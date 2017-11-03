
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
