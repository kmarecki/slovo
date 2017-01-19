import * as passport from 'passport';
import { Strategy } from 'passport-local';

import { IUser } from '../shared/entities/user';
import { UserRepository } from './db/user';

var strategy = new Strategy(
    (username, password, done) => {
        let db = new UserRepository();
        db.findByName(username, (err, user) => {
            if (!err && user) {
                if (user.password == password) {
                    return done(null, user);
                }
            }
            return done(err, false, { message: 'Failed to authenticate.' });
        });
    });
passport.use(strategy);

passport.serializeUser<IUser, number>((user, done) => {
    done(null, user.userId);
}); 

passport.deserializeUser<IUser, number>((id, done) => {
    let db = new UserRepository();
    db.findById(id, (err, user) => done(err, user));
});