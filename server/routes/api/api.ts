import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

import { ExpressApp } from 'express-app';
import { MongoDb } from 'mongoose-repos';

import { IAuthenticateRequest, IAuthenticateResponse } from '../../../shared/contracts/authenticate';
import { ISignupRequest, ISignupResponse } from '../../../shared/contracts/signup';
import { IAliveResponse } from '../../../shared/contracts/alive';
import { IUser, UserLevel } from '../../../shared/entities/user';
import { UserRepository } from '../../db/user';
var packageJson = require('../../../package.json');

export let router = express.Router();

router.post('/api/authenticate', (req, res) => {
    let request = <IAuthenticateRequest>req.body;
    let db = new UserRepository();
    db.findByName(request.username, (err, user) => {
        let response: IAuthenticateResponse;
        if (err) {
            response = { success: false, msg: `Authentication error: ${err.message}` };
            res.json(response);
        } else {
            db.comparePassword(user, request.password)
                .then((result) => {
                    if (result.equal) {
                        const token = jwt.sign({ userId: user.userId }, 'qwerty');
                        response = { success: true, token: `JWT ${token}` };
                    } else {
                        response = { success: false, msg: 'Authentication failed.' };
                    }
                    res.json(response);
                })
                .catch((err) => {
                    response = { success: false, msg: 'Authentication failed.' };
                    res.json(response);
                })
        }
    });
});

router.post('/api/signup', (req, res) => {
    let request = <ISignupRequest>req.body;
    let response: ISignupResponse;

    if (!request.username || !request.password) {
        response = { success: false, msg: 'Username or password failed.' };
        res.json(response);
    } else {
        let db = new UserRepository();
        db.createUser(
            request.username,
            request.password,
            request.email,
            (err) => {
                if (err) {
                    response = { success: false, msg: `Signup error: ${err.message}` }
                } else {
                    response = { success: true, msg: 'Successful created new user.' }
                }
                res.json(response);
            });
    }
});

router.get('/api/alive', (req, res) => {
    const response: IAliveResponse = {
        isConnectedToDatabase: false,
        version: packageJson.version
    }
    MongoDb.open()
        .then(() => {
            response.isConnectedToDatabase = true;
            res.json(response);
        })
        .catch(() => res.json(response));
})