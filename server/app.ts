import * as express from 'express';

import * as http from 'http';
import * as path from 'path';

import {ExpressApp} from 'express-app';
import {MongoConfiguration} from 'mongoose-repos';
import * as adminRoutes from './routes/admin';
import * as apiRoutes from './routes/api';

let config = require('config');
let root =  path.join(__dirname, '..');
let publicPath = path.join(root, 'app');
let app = express();
ExpressApp.physicalPath = publicPath;

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(root, 'views'));
app.set('view engine', 'jade');

app.use(adminRoutes.router);
app.use(apiRoutes.router);
app.use('/', express.static(ExpressApp.physicalPath));

MongoConfiguration.uri = config.MongoDb.uri;

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
