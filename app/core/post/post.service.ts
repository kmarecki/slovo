import * as ng from 'angular';

export interface IPostHeader {
    postId: number;
    title: string;
    date: Date;
}

export interface IPost {
    postId: number;
    title: string;
    date: Date;
    text: string;
}

export interface IPostHeaderResource extends ng.resource.IResourceClass<ng.resource.IResource<IPostHeader>> { }

export interface IPostResource extends ng.resource.IResourceClass<ng.resource.IResource<IPost>> { }

export interface IPostDataService {
    getPostHeaderResource(): IPostHeaderResource;
}

export class PostDataService implements IPostDataService {
    static $inject = ['$resource'];

    constructor(private $resource: ng.resource.IResourceService) { }

    getPostHeaderResource(): IPostHeaderResource {
        return <IPostHeaderResource>this.$resource('/api/posts');
    };

    getPostResource(): IPostResource {
        return <IPostResource>this.$resource('/api/post/:id');
    };
}
