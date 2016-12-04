import * as express from 'express';

import { ExpressApp, ResponseUtil } from 'express-app';

import { ISettings} from '../../../shared/entities/settings';
import { SettingsRepository } from '../../db/settings';

export let router = express.Router();

router.get('/api/settings', (req: express.Request, res: express.Response) => {
    let db = new SettingsRepository();
    db.getSettings((err, headers) => {
        if (err) {
            ExpressApp.response.handleError(res, err.message, 'Failed to get settings');
        } else {
            res.status(200).json(headers);
        }
    });
});

router.post('/api/settings', (req: express.Request, res: express.Response) => {
    let db =  new SettingsRepository();
    let post = <ISettings>req.body;
    db.saveSettings(post, (err) => {
        if (err) {
            ExpressApp.response.handleError(res, err.message, 'Failed to save settings');
        } else {
            res.status(201).end();
        }
    });
});