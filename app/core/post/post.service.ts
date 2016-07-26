import * as ng from 'angular';

export interface IPostHeader extends ng.resource.IResource<IPostHeader> {
    id: number;
    title: string;
    date: Date;
}

export interface IPost extends ng.resource.IResource<IPost> {
    id: number;
    title: string;
    date: Date;
    text: string;
}

export interface IPostHeaderResource extends ng.resource.IResourceClass<IPostHeader> { }

export interface IPostResource extends ng.resource.IResourceClass<IPost> { }

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
        return <IPostResource>this.$resource('/api/posts/:id');
    };
}
