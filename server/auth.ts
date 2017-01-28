import * as passport from 'passport';
import { Strategy } from 'passport-local';
import * as jwt from 'passport-jwt';

import { IUser } from '../shared/entities/user';
import { UserRepository } from './db/user';

let strategy = new Strategy(
    (username, password, done) => {
        let db = new UserRepository();
        db.findByName(username, (err, user) => {
            if (!err && user) {
                db.comparePassword(user, password)
                    .then((equal) => {
                        if (equal) {
                            return done(null, user);
                        } else {
                            return done(err, false, { message: 'Failed to authenticate.' });
                        }
                    });
            } else {
                return done(err, false, { message: 'Failed to authenticate.' });
            }
        });
    });
passport.use(strategy);

let jwtOptions: jwt.StrategyOptions = {
    secretOrKey: 'qwerty',
    jwtFromRequest: jwt.ExtractJwt.fromAuthHeader()
};
let jwtStrategy = new jwt.Strategy(
    jwtOptions,
    (payload, done) => {
        let db = new UserRepository();
        db.findById(payload.userId, (err, user) => {
            if (err) {
                done(err, false);
            } else {
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            }
        });
    }
);

passport.use(jwtStrategy);

passport.serializeUser<IUser, number>((user, done) => {
    done(null, user.userId);
});

passport.deserializeUser<IUser, number>((id, done) => {
    let db = new UserRepository();
    db.findById(id, (err, user) => done(err, user));
});