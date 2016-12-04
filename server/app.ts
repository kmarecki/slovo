import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as path from 'path';

import {ExpressApp} from 'express-app';
import {MongoConfiguration, MongoDb} from 'mongoose-repos';

import * as adminRoutes from './routes/admin';

import * as postRoutes from './routes/api/post';
import * as settingsRoutes from './routes/api/settings';

let config = require('config');
let root =  path.join(__dirname, '..');
let publicPath = path.join(root, 'app');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

ExpressApp.physicalPath = publicPath;

app.set('port', process.env.PORT || 3000);

app.use(adminRoutes.router);
app.use(postRoutes.router);
app.use(settingsRoutes.router);
app.use('/', express.static(ExpressApp.physicalPath));

MongoConfiguration.uri = config.MongoDb.uri;
MongoConfiguration.useAutoIncrement = true;
MongoDb.open();

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
