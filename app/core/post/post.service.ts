import * as ng from 'angular';
import { IPost, IPostHeader } from '../../../shared/entities/post';


export interface IPostHeaderResource extends ng.resource.IResourceClass<ng.resource.IResource<IPostHeader>> { }

export interface IPostResource extends ng.resource.IResourceClass<ng.resource.IResource<IPost>> { }

export interface IPostDataService {

    getPostHeaders(onlyPublished: boolean): ng.IPromise<IPostHeader[]>;

    getPosts(onlyPublished: boolean):  ng.IPromise<IPost[]>;

    getPost(id, result: (post: IPost) => any, err?: (err) => any);

    savePost(post: IPost, success: () => any, err?: (err) => any);

    deletePost(postId, success: (result) => any, err?: (err) => any);
}

export class PostDataService implements IPostDataService {
    static $inject = ['$resource', '$q'];

    constructor(
        private $resource: ng.resource.IResourceService,
        private $q: ng.IQService) { }

    private getPostHeaderResource(): IPostHeaderResource {
        return <IPostHeaderResource>this.$resource('/api/postHeaders');
    };

    private getPostResource(): IPostResource {
        return <IPostResource>this.$resource('/api/posts/:id');
    };

    getPostHeaders(onlyPublished: boolean): ng.IPromise<IPostHeader[]> {
        return this.$q((resolve, reject) => {
            let postHeaderResource = this.getPostHeaderResource();
            postHeaderResource.query(
                { published: onlyPublished },
                (headers) => {
                    resolve(headers);
                },
                (err) => {
                    reject(err);
                });
        });
    }

    getPosts(onlyPublished: boolean): ng.IPromise<IPost[]> {
        return this.$q((resolve, reject) => {
            let postResource = this.getPostResource();
            postResource.query(
                { published: true },
                (posts) => {
                    resolve(posts);
                },
                (err) => {
                    reject(err);
                });
        });
    }

    getPost(id, result: (post: IPost) => any, err?: (err) => any) {
        let postResource = this.getPostResource();
        postResource.get(
            { id: id },
            (post) => {
                result(post);
            },
            (err) => {
                err(err);
            });
    }

    savePost(post: IPost, success: () => any, err?: (err) => any) {
        let postResource = this.getPostResource();
        postResource.save({}, post,
            () => {
                success();
            },
            (err) => {
                err(err);
            });
    }

    deletePost(postId, success: (result) => any, err?: (err) => any) {
        let postResource = this.getPostResource();
        postResource.delete(
            { id: postId },
            (result) => {
                success(result);
            },
            (err) => {
                err(err);
            });
    }
}