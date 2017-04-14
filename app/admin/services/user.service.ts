import * as ng from 'angular';

import { IUser } from '../../../shared/entities/user';

export interface IUserResource extends ng.resource.IResourceClass<ng.resource.IResource<IUser>> { }

export interface IUserDataService {

    getUsers(): ng.IPromise<IUser[]>;

    // saveUser(user: IUser): ng.IPromise<any>;

    // deleteUser(userId: number): ng.IPromise<any>;
}

export class UserDataService implements IUserDataService {

    static $inject = ['$resource', '$q'];

    constructor(
        private $resource: ng.resource.IResourceService,
        private $q: ng.IQService) { }

    private getUserResource(): IUserResource {
        return <IUserResource>this.$resource('/api/users/:id');
    }

    getUsers(): ng.IPromise<IUser[]> {
        return this.$q((resolve, reject) => {
            const userResource = this.getUserResource();
            userResource.query(
                (users) => {
                    resolve(users);
                },
                (err) => {
                    reject(err);
                }
            )
        })
    }
}
