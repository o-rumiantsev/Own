'use strict';

const obs = new Set;

const f = function() {
  console.log('Function in!');
}

obs.add(f);
obs.add(() => {
  console.log('huiambda');
});

for (const i of obs) {
  const fn = i;
  fn();
}
