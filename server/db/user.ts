import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { MongoRepository, SchemaOptions, defaultHandler, defaultResultHandler } from 'mongoose-repos';

import { IUser, UserLevel } from '../../shared/entities/user';

interface UserModel extends IUser, mongoose.Document { }

export class UserRepository extends MongoRepository {

    private User: mongoose.Model<UserModel>;

    findOrCreateUserByAuthId(
        authId: string,
        authStrategy: string,
        callback: (err: Error, user: IUser) => any): void {

        let query = { authId: authId, authStrategy: authStrategy };
        this.findOne(
            this.User,
            query,
            (err, result) => defaultResultHandler(err, result, (err, user) => {
                if (user === null && err === null) {
                    this.User.create(
                        { authId: authId, authStrategy: authStrategy },
                        callback);
                } else {
                    callback(err, user);
                }
            }));
    }

    findById(
        userId: number,
        callback: (err: Error, user: IUser) => any): void {

        let query = { userId: userId };
        this.findOne(
            this.User,
            query,
            (err, result) => defaultResultHandler(err, result, callback));
    }

    findByName(
        userName: string,
        callback: (err: Error, user: IUser) => any): void {

        let query = { userName: userName };
        this.findOne(
            this.User, 
            query, 
            (err, result) => defaultResultHandler(err, result, callback));
    }

    create(
        username: string,
        password: string,
        email: string,
        callback: (err: Error) => any): void {

        let user: IUser = {
            userId: 0,
            authId: '',
            authStrategy: 'local',
            userName: username,
            password: password,
            email: email,
            userLevel: UserLevel.User
        };

        this.save(user, callback);
    }

    save(user: IUser, callback: (err: Error) => any): void {
        let query = { userId: user.userId };
        this.findOneAndSave(
            this.User, 
            query, 
            user, 
            (err) => defaultHandler(err, callback));
    }

    comparePassword(user: IUser, password: string): Promise<{ err: Error, equal: boolean }> {
        return new Promise((fullfill, reject) => {
            if (user && user.password) {
                bcrypt.compare(password, user.password)
                    .then(
                    (result) => fullfill({ equal: result }),
                    (err) => reject({ err: err, equal: false }));
            } else {
                reject({ equal: false });
            }
        });
    }

    protected addSchemas(): void {
        let schema = new mongoose.Schema({
            userId: {
                type: Number,
                unique: true,
                index: true
            },
            authId: String,
            authStrategy: String,
            userName: String,
            password: String,
            email: String,
            userLevel: Number
        });
        let options: SchemaOptions = {
            autoIncrement: true,
            autoIncrementOptions: {
                field: 'userId',
                startAt: 1,
            },
        };
        schema.pre('save', function (next) {
            let user = this;
            bcrypt.genSalt(10)
                .then((salt) => bcrypt.hash(user.password, salt))
                .then((hash) => {
                    user.password = hash;
                    next()
                })
                .catch((err) => next(err));
        });
        this.User = this.addModel<UserModel>('User', schema, options);
    }
}
