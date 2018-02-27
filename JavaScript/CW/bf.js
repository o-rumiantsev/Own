'use strict';

function brainfuck_to_c(sc) {
  const source = optimize(sc);
  if (!source && source != '') return 'Error!';

  const resArr = source.replace(
    /(\++)/g, match => `*p += ${match.length};\n`
  ).replace(/(-+)/g, match => `*p -= ${match.length};\n`)
    .replace(/(>+)/g, match => `p += ${match.length};\n`)
    .replace(/(<+)/g, match => `p -= ${match.length};\n`)
    .replace(/(\.)/g, `putchar(*p);\n`)
    .replace(/(,)/g, `*p = getchar();\n`)
    .replace(/(\[)/g, `if (*p) do {\n`)
    .replace(/(])/g, `} while (*p);\n`)
    .split('\n');

  let tab = '';

  const result = resArr.map((line) => {
    if (line.startsWith('if')) {
      const t = tab;
      tab += '  ';
      return t + line;
    } else if (line.startsWith('} while')) {
      tab = tab.substring(0, tab.length - 2);
      return tab + line;
    } else {
      return tab + line;
    }
  }).join('\n');

  return result;
}

function opt(src) {
  let optimized = true;
  const res = src.replace(/[^+-.,<>[\]]/g, '')
    .replace(/(\+-)/g, '')
    .replace(/(-\+)/g, '')
    .replace(/(\[])/g, '')
    .replace(/(<>)/g, '')
    .replace(/(><)/g, '');

  if (
    res.includes('+-') ||
    res.includes('-+') ||
    res.includes('[]') ||
    res.includes('<>') ||
    res.includes('><')
  ) optimized = false;

  if (!optimized) return opt(res);
  else return res;
}

function optimize(src) {
  let optimized = opt(src);

  const condStart = optimized.match(/[\[]/g);
  const condEnd = optimized.match(/[\]]/g);

  if (
    (condStart && !condEnd) || (condEnd && !condStart) ||
    (condStart && condEnd && condStart.length != condEnd.length) ||
    optimized.startsWith(']')
  ) return null;

  return optimized;
}
