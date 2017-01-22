import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

import { ExpressApp } from 'express-app';

import { IUser, UserLevel } from '../../../shared/entities/user';
import { UserRepository } from '../../db/user';

export let router = express.Router();

router.post('/api/authenticate', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let db = new UserRepository();
    db.findByName(username, (err, user) => {
        if (err) {
            throw err;
        }

        if (user && user.password === password) {
            var token = jwt.sign(user, 'qwerty');
            res.json({ success: true, token: `JWT ${token}` });

        } else {
            res.json({ success: false, msg: 'Authentication failed.' });
        }
    });
});

router.post('/api/signup', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        res.json({ success: false, msg: 'Username and password failed.' });
    } else {
        let db = new UserRepository();
        db.create(username, password, (err) => {
            if (err) {
                res.json({success: false, msg: 'Failed to signup a user.'})
            } else {
                res.json({success: true, msg: 'Successful created new user.'})
            }
        });
    }
});