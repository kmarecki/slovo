import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as path from 'path';
import * as passport from 'passport';
import cookieParser = require('cookie-parser');
import flash = require('connect-flash');

import { ExpressApp } from 'express-app';
import { MongoConfiguration, MongoDb } from 'mongoose-repos';

import * as adminRoutes from './routes/admin';

import * as apiRoutes from './routes/api/api';
//TODO Combine seperate api routers
import * as postRoutes from './routes/api/post';
import * as settingsRoutes from './routes/api/settings';
import * as userRoutes from './routes/api/user';

const config = require('config');
const root = path.join(__dirname, '../..');
const publicPath = path.join(root, 'app');
export const app = express();

app.use(cookieParser());
app.use(session({ secret: '1234567890qwerty' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

import './auth';

ExpressApp.physicalPath = publicPath;

app.set('port', process.env.PORT || 3000);

app.use(adminRoutes.router);
app.use(apiRoutes.router);
app.use(postRoutes.router);
app.use(settingsRoutes.router);
app.use(userRoutes.router);
app.use('/', express.static(ExpressApp.physicalPath));

MongoConfiguration.uri = config.MongoDb.uri;
MongoConfiguration.useAutoIncrement = true;
MongoConfiguration.useLogger = true;
MongoConfiguration.debug = config.MongoDb.debug;
MongoDb.configure();

const server = http.createServer(app);
const port = app.get('port');
server.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
