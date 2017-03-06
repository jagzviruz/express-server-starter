'use strict';
import path from 'path';

import csrf from './api/csrf';
// Add modules that map to your routes here.
import dummy from './api/dummy';

module.exports = exports = function(app) {
  app.use('/csrf', csrf);
  //Add your routes here
  app.use('/api/dummy', dummy);

  if(app.get('env') === 'development') {
    let pathfinderUI = require('pathfinder-ui');
    app.use('/listroutes', function(req, res, next) {
      pathfinderUI(app);
      next();
    }, pathfinderUI.router);
  }

  // If it does not match any of the above routes, map to this
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
};
