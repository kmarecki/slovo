import * as mongoose from 'mongoose';

import {MongoRepository, defaultHandler, defaultResultHandler, defaultResultArrayHandler} from 'mongoose-repos';

export interface Post {
    title: string;
    category: string;
    date: Date;
    text: string;
}


interface PostModel extends Post, mongoose.Document { }

export class PostRepository extends MongoRepository {

    private Post: mongoose.Model<PostModel>;

    findPost(
        title: string,
        category: string,
        callback: (err: Error, Post: Post) => any): void {

        this.connect();
        let query = { category: category, title: title };
        this.Post.findOne(
            query,
            (err, result) => defaultResultHandler(err, result, callback));
    };

    findPosts(callback: (err: Error, headers: { id: any, title: string, date: Date }[]) => any): void {

        // this.connect();
        // this.Post.find({})
        //     .sort({ title: 'asc' })
        //     .select({ date: 1, title: 1 })
        //     .exec((err, result) => defaultResultArrayHandler(err, result, callback, (item: PostModel) => {
        //         return {
        //             date: item.date,
        //             id: item._id,
        //             title: item.title,
        //         };
        //     }));

        callback(null, [
            { date: new Date(2015, 2, 23), id: 1, title: 'First post' },
            { date: new Date(2015, 3, 23), id: 2, title: 'Second post' },
            { date: new Date(2016, 5, 23), id: 3, title: 'Third post' },
        ]);
    };

    savePost(post: Post, callback: (err: Error) => any): void {
        this.connect();
        let query = { category: post.category, title: post.title };
        this.Post.findOneAndUpdate(
            query,
            post,
            { upsert: true },
            (err) => defaultHandler(err, callback));
    }

    removePost(
        title: string,
        category: string,
        callback: (err: Error) => any): void {

        this.connect();
        let query = { category: title, title: title };
        this.Post.remove(
            query,
            (err) => defaultHandler(err, callback));
    }

    protected addSchemas(): void {
        let schema = new mongoose.Schema({
            category: String,
            date: Date,
            title: String,
            text: String,
        });
        this.Post = this.addModel<PostModel>('Post', schema);
    }
}
