'use sritct';

const fs = require('fs');

const subscribed = (name, arr) => {
  for (const i in arr) {
    for (const j in arr[i]) {
      if (arr[i][j]['name'] === name) {
        return true;
      }
    }
  }
  return false;
}

exports.file = function(Obs, path, interval) {
  let observing = fs.readFileSync(path, 'utf8');
  Obs.on('change', null, function(data) {
    console.log(
      'Changed to:\n' + data.replace(/"/g, '')
    );
  });
  const int = setInterval(function() {
    if (subscribed('change', Obs.observers)) {
      fs.readFile(path, 'utf8', function(err, data) {
        if (err) throw err;
        const content = data;
        if (content !== observing) {
          console.log('Filer');
          Obs.send('change', content);
          observing = content;
        }
      });
    } else clearInterval(int);
  }, interval);

  return Obs;
}

exports.object = function(Obs, context, interval) {
  let ctx = JSON.stringify(context);
  Obs.on('change', context, function() {
    console.log(
      'Changed to:\n' + JSON.stringify(this, null, 2).replace(/"/g, '')
    );
  })
  const int = setInterval(function() {
    if (subscribed('change', Obs.observers)) {
      if (ctx !== JSON.stringify(context)) {
        console.log('Objecter');
        Obs.send('change');
        ctx = JSON.stringify(context);
      }
    } else clearInterval(int);
  }, interval);
  return Obs;
}
