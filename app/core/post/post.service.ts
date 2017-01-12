import * as ng from 'angular';
import { IPost, IPostHeader } from '../../../shared/entities/post';


export interface IPostHeaderResource extends ng.resource.IResourceClass<ng.resource.IResource<IPostHeader>> { }

export interface IPostResource extends ng.resource.IResourceClass<ng.resource.IResource<IPost>> { }

export interface IPostDataService {
    getPostHeaders(onlyPublished: boolean, result: (headers: IPostHeader[]) => any, err?: (err) => any);

    getPosts(onlyPublished: boolean, result: (posts: IPost[]) => any, err?: (err) => any);

    getPost(id, result: (post: IPost) => any, err?: (err) => any);

    savePost(post: IPost, success: () => any, err?: (err) => any);

    deletePost(postId, success: (result) => any, err?: (err) => any);
}

export class PostDataService implements IPostDataService {
    static $inject = ['$resource'];

    constructor(private $resource: ng.resource.IResourceService) { }

    private getPostHeaderResource(): IPostHeaderResource {
        return <IPostHeaderResource>this.$resource('/api/postHeaders');
    };

    private getPostResource(): IPostResource {
        return <IPostResource>this.$resource('/api/posts/:id');
    };

    getPostHeaders(onlyPublished: boolean, result: (headers: IPostHeader[]) => any, err?: (err) => any) {
        let postHeaderResource = this.getPostHeaderResource();
        postHeaderResource.query(
            { published: onlyPublished },
            (headers) => {
                result(headers);
            },
            (err) => {
                err(err);
            });
    }

    getPosts(onlyPublished: boolean, result: (posts: IPost[]) => any, err?: (err) => any) {
        let postResource = this.getPostResource();
        postResource.query(
            { published: true },
            (posts) => {
                result(posts);
            },
            (err) => {
                err(err);
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