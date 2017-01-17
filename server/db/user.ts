import * as mongoose from 'mongoose';
import { MongoRepository, SchemaOptions, defaultHandler, defaultResultHandler } from 'mongoose-repos';

import { IUser } from '../../shared/entities/user';

interface UserModel extends IUser, mongoose.Document { }

export class UserRepository extends MongoRepository {

    private User: mongoose.Model<UserModel>;

    findOrCreateUserByAuthId(
        authId: string,
        authStrategy: string,
        callback: (err: Error, user: IUser) => any): void {

        this.connect();
        let query = { authId: authId, authStrategy: authStrategy };
        this.User.findOne(
            query,
            (err, result) => defaultResultHandler(err, result, (err, user) => {
                if (user === null && err === null) {
                    this.User.create(
                        { authId: authId, authStrategy: authStrategy},
                    callback);
                } else {
                    callback(err, user);
                }
            }));
    }

    findUserById(
        userId: number,
        callback: (err: Error, user: IUser) => any): void {

        this.connect();
        let query = { userId: userId };
        this.User.findOne(
            query,
            (err, result) => defaultResultHandler(err, result, callback));
    }

    findUserByName(
        userName: string,
        callback: (err: Error, user: IUser) => any): void {

        this.connect();
        let query = { userName: userName };
        this.User.findOne(
            query,
            (err, result) => defaultResultHandler(err, result, callback));
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
        }
        this.User = this.addModel<UserModel>('User', schema, options);
    }
}
