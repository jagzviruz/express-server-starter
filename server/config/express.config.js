'use strict';

import compression from 'compression';
import csrf from 'csurf';
import lusca from 'lusca';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
//import cookieParser from 'cookie-parser';
import session from 'express-session';
import cookieSession from 'cookie-session';
import uuid from 'uuid';
import shortid from 'shortid';


/**
 * This function is for setting up the configuration of the Express instance.
 * @param {*} app Instance of the express app
 */

export default function(app) {
  const env = app.get('env');

  const secret = uuid.v4();
  const sess = {
    secret,
    cookie: {},
    resave: false,
    saveUninitialized: true,
  };

  console.log(`Setting up express for ${env} Environment`);
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  app.use(helmet());
  app.use(compression());
  app.use(morgan('[:date[iso]] :date[web] :remote-addr - :remote-user :method :url :status[pretty] :response-time'));

  // trust first proxy
  app.set('trust proxy', 1);

  if(app.get('env') === 'production') {
    //sess.cookie.secure = true; // serve secure cookies
  }
  app.use(session(sess));


  if(env !== 'test') {
    console.log("Setting up lusca middleware");
    // Lusca can be initialized only after a session middleware is added.
    app.use(lusca({
      csrf: true,
      xframe: 'SAMEORIGIN',
      hsts: {
        maxAge: 31536000, //1 year, in seconds
        includeSubDomains: true,
        preload: true
      },
      xssProtection: true
    }));
  //   app.use(lusca({
  //     csrf: true,
  //     xframe: 'SAMEORIGIN',
  //     p3p: 'ABCDEF',
  //     hsts: {maxAge: 31536000, includeSubDomains: true, preload: true},
  //     xssProtection: true,
  //     nosniff: true
  // }));
  }
}
