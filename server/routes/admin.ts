import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

import {ExpressApp} from 'express-app';

export let router = express.Router();

router.get('/admin/*', (req: express.Request, res: express.Response) => {
    let filePath = path.join(ExpressApp.physicalPath, req.path);
    fs.exists(filePath, (exists) => {
        if (exists) {
            res.sendFile(filePath);
        } else {
            let indexPath = path.join(ExpressApp.physicalPath, 'admin', 'index.html');
            res.sendFile(indexPath);
        }
    });
});

