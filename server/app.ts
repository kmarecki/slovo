import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as path from 'path';

import {ExpressApp} from 'express-app';
import {MongoConfiguration, MongoDb} from 'mongoose-repos';

let config = require('config');
let root =  path.join(__dirname, '..');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

ExpressApp.physicalPath = path.join(root, 'app');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(root, 'views'));
app.set('view engine', 'jade');

import * as publicRoutes from './routes/public';
import * as adminRoutes from './routes/admin';
import * as apiRoutes from './routes/api';

app.use(apiRoutes.router);
app.use(adminRoutes.router);
app.use(publicRoutes.router);

MongoConfiguration.uri = config.MongoDb.uri;
MongoConfiguration.useAutoIncrement = true;
MongoDb.open();

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
