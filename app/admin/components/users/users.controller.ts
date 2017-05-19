import * as ng from 'angular';
import * as _ from 'lodash';

import { IUser } from '../../../../shared/entities/user';
import { IUserDataService } from '../../services/user.service';
import { MessageBoxController } from '../message-box/message-box.controller';

export class UsersController {
    static $inject = ['$uibModal', 'services.user'];

    users: IUser[];
    selected: IUser;
    refresh: ng.IPromise<any>
    readonly: boolean;

    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private userService: IUserDataService
    ) {
        this.refresh = this.refreshModel();
    }

    refreshModel(): ng.IPromise<any> {
        return this.userService.getUsers()
            .then((users) => {
                this.users = users
                this.selected = this.users.length > 0 ? this.users[0] : undefined; 
                this.readonly = true;
            })
            .catch((err) => MessageBoxController.showError(this.$uibModal, err));
    }

    newUser(): void {
        this.selected = <IUser>{};
        this.readonly = false;
    }

    editUser(userId: number): void {
        this.selectUser(userId);
        this.readonly = false;
    }

    selectUser(userId: number): void {
       this.selected = _.find(this.users, (obj) => obj.userId == userId);
       this.readonly = true;
    }

    removeUser(userId: number): ng.IPromise<any> {
        return this.userService.deleteUser(userId)
            .then(() => this.refreshModel())
            .catch((err) => MessageBoxController.showError(this.$uibModal, err));
    }

    saveSelectedUser(): ng.IPromise<any> {
        return this.userService.saveUser(this.selected)
            .then(() => this.refreshModel())
            .catch((err) => MessageBoxController.showError(this.$uibModal, err));
    }
}