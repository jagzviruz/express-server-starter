'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';
import shared from './public';

const rootPath = path.normalize(`${__dirname}/../../..`); // This gives the path of the root of the module where the client and server folders are created
const appConfig = {
  env: process.env.NODE_ENV || 'development',
  // Root path of server
  root: rootPath,
  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',
  appPath: path.join(rootPath, 'client')
};

module.exports = _.merge(appConfig, shared, require(`./${appConfig.env}.js`));
