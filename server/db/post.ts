import * as mongoose from 'mongoose';
import { MongoRepository, SchemaOptions, defaultHandler, defaultResultHandler, defaultResultArrayHandler } from 'mongoose-repos';

import { IPost, IPostHeader } from '../../shared/entities/post';

interface PostModel extends IPost, mongoose.Document { }

export class PostRepository extends MongoRepository {

    private Post: mongoose.Model<PostModel>;

    findPost(
        postId: number,
        callback: (err: Error, Post: IPost) => any): void {

        this.connect();
        let query = { postId: postId };
        this.Post.findOne(
            query,
            (err, result) => defaultResultHandler(err, result, callback));
    }

    findPostHeaders(
        onlyPublished: boolean,
        callback: (err: Error, headers: IPostHeader[]) => any): void {
        this.connect();
        let query = onlyPublished ? {published: true} : {};
        this.Post.find(query)
            .sort({ postId: 'asc' })
            .select({ date: 1, postId: 1, title: 1, published: 1 })
            .exec((err, result) => defaultResultArrayHandler(err, result, callback, (item: PostModel) => {
                let header: IPostHeader = {
                    date: item.date,
                    postId: item.postId,
                    title: item.title,
                    published: item.published
                };
                return header;
            }));
    }

    findPosts(
        onlyPublished: boolean,
        callback: (err: Error, posts: IPost[]) => any): void {
        this.connect();
        let query = onlyPublished ? {published: true} : {};
        this.Post.find(query)
            .sort({ postId: 'asc' })
            .select({})
            .exec((err, result) => defaultResultArrayHandler(err, result, callback, ));
    }


    savePost(post: IPost, callback: (err: Error) => any): void {
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
            postId: {
                type: Number,
                unique: true,
                index: true,
            },
            category: String,
            date: Date,
            title: String,
            text: String,
            published: Boolean
        });
        let options: SchemaOptions = {
            autoIncrement: true,
            autoIncrementOptions: {
                field: 'postId',
                startAt: 1,
            },
        }
        this.Post = this.addModel<PostModel>('Post', schema, options);
    }
}
