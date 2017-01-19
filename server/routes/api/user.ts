import * as express from 'express';

import { ExpressApp, ResponseUtil } from 'express-app';

import { IUser } from '../../../shared/entities/user';
import { UserRepository } from '../../db/user';

export let router = express.Router();

router.post('/api/users', (req: express.Request, res: express.Response) => {
    let db = new UserRepository();
    let post = <IUser>req.body;
    db.save(post, (err) => {
        if (err) {
            ExpressApp.response.handleError(res, err.message, 'Failed to save a user');
        } else {
            res.status(201).end();
        }
    });
});

router.get('/api/users/:id', (req: express.Request, res: express.Response) => {
    let db = new UserRepository();
    let userId = req.params.id;
    db.findById(userId, (err, user) => {
        if (err) {
            ExpressApp.response.handleError(res, err.message, `Failed to get user {Id: ${userId}}`);
        } else {
            res.status(200).json(user);
        }
    });
});

