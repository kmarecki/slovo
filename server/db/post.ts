import * as mongoose from 'mongoose';

import {MongoRepository, SchemaOptions, defaultHandler, defaultResultHandler, defaultResultArrayHandler} from 'mongoose-repos';

export interface Post {
    postId: number;
    title: string;
    category: string;
    date: Date;
    text: string;
}


interface PostModel extends Post, mongoose.Document { }

export class PostRepository extends MongoRepository {

    private Post: mongoose.Model<PostModel>;

    findPost(
        postId: number,
        callback: (err: Error, Post: Post) => any): void {

        this.connect();
        let query = { postId: postId };
        this.Post.findOne(
            query,
            (err, result) => defaultResultHandler(err, result, callback));
    };

    findPosts(callback: (err: Error, headers: { id: any, title: string, date: Date }[]) => any): void {
        this.connect();
        this.Post.find({})
            .sort({ postId: 'asc' })
            .select({ date: 1, postId: 1, title: 1 })
            .exec((err, result) => defaultResultArrayHandler(err, result, callback, (item: PostModel) => {
                return {
                    date: item.date,
                    postId: item.postId,
                    title: item.title,
                };
            }));
    };

    savePost(post: Post, callback: (err: Error) => any): void {
        let query = { postId: post.postId };
        this.findOneAndSave(this.Post, query, post, (err) => defaultHandler(err, callback));
    }

    removePost(
        postId: number,
        callback: (err: Error) => any): void {

        this.connect();
        let query = { postId: postId };
        this.Post.remove(
            query,
            (err) => defaultHandler(err, callback));
    }

    protected addSchemas(): void {
        let schema = new mongoose.Schema({
            postId: Number,
            category: String,
            date: Date,
            title: String,
            text: String,
        });
        let options: SchemaOptions = {
            autoIncrement: true,
            autoIncrementOptions : {
                field: 'postId',
                startAt: 1,
            },
        }
        this.Post = this.addModel<PostModel>('Post', schema, options);
    }
}
