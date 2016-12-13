import * as express from 'express';

import { ExpressApp, ResponseUtil } from 'express-app';

import { ISettings} from '../../../shared/entities/settings';
import { SettingsRepository } from '../../db/settings';

export let router = express.Router();

//TODO: Why /api/settings doesn't work - hangs?
router.get('/api/siteSettings', (req: express.Request, res: express.Response) => {
    let db = new SettingsRepository();
    db.getSettings((err, settings) => {
        if (err) {
            ExpressApp.response.handleError(res, err.message, 'Failed to get settings');
        } else {
            res.status(200).json(settings);
        }
    });
});

router.post('/api/siteSettings', (req: express.Request, res: express.Response) => {
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