import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as passport from 'passport';

import { ExpressApp } from 'express-app';

export let router = express.Router();

const indexPage = (req: express.Request, res: express.Response) => {
    let indexPath = path.join(ExpressApp.physicalPath, 'admin', 'index.html');
    res.sendFile(indexPath);
}

router.get('/admin/', indexPage);
router.get('/admin/login', indexPage);
router.get('/admin/signup', indexPage);
router.get('/admin/comments(/*)?', indexPage);
router.get('/admin/posts(/*)?', indexPage);
router.get('/admin/settings(/*)?', indexPage);
router.get('/admin/users(/*)?', indexPage);

router.get('/admin/*',
    //passport.authenticate('jwt', { session: false }),
    (req: express.Request, res: express.Response) => {
        let filePath = path.join(ExpressApp.physicalPath, req.path);
        fs.stat(filePath, (err, stats) => {
            if (stats && stats.isFile()) {
                res.sendFile(filePath);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write('404 Not Found\n');
                res.end();
            }
        });
    });

