import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as passport from 'passport';

import {ExpressApp} from 'express-app';

export let router = express.Router();

router.post('/admin')

router.get('/admin/*', 
    //passport.authenticate('local', { failureFlash: true }),
    (req: express.Request, res: express.Response) => {
    let filePath = path.join(ExpressApp.physicalPath, req.path);
    fs.stat(filePath, (err, stats) => {
        if (stats && stats.isFile()) {
            res.sendFile(filePath);
        } else {
            let indexPath = path.join(ExpressApp.physicalPath, 'admin', 'index.html');
            res.sendFile(indexPath);
        }
    });
});

