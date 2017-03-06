'use strict';

export function index(req, res) {
  return Promise.resolve().then(() => {
    res.json({
      msg: 'Dummy response'
    });
  });
}

function saveToSomeDB(data) {
  var promise = new Promise(function(resolve, reject) {
    try {
      setTimeout(function() {
        resolve({
          msg: 'Data Saved',
          data
        });
      }, 3000);
    } catch(err) {
      reject(err);
    }
  });
  return promise;
}

export function save(req, res) {
  return saveToSomeDB(req.body)
    .then(data => res.send(data));
}
