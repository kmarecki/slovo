import * as passport from 'passport';
import { Strategy } from 'passport-local';

import { IUser } from '../shared/entities/user';

var strategy = new Strategy(
    (username, password, done) => {
        return done(null, false, { message: 'Failed to authenticate.' });
    });
passport.use(strategy);

passport.serializeUser<IUser, number>((user, done) => {
    done(null, user.userId);
}); 