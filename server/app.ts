///<reference path="../typings/index.d.ts"/>

import * as express from 'express';

import * as http from 'http';
import * as path from 'path';

import * as appRoutes from './routes/app';
import * as adminRoutes from './routes/admin';

let root =  path.join(__dirname, '..');
let app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(root, 'views'));
app.set('view engine', 'jade');

let publicPath = path.join(root, 'app');
app.use('/', express.static(publicPath));

app.use(appRoutes.router);
app.use(adminRoutes.router);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
