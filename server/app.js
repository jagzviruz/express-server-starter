'use strict';
/**
 * Application Bootstrap
 */
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import config from './config/environment';
import expressConfiurator from './config/express.config';
import initializeRoutes from './routes';

// Setup server
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(helmet());

app.set('appPath', config.appPath);
app.set('env', config.env);

expressConfiurator(app);
initializeRoutes(app);

const server = http.createServer(app);

function bootUpServer() {
  app.server = server.listen(config.port, config.ip, () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(bootUpServer);
