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

    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private userService: IUserDataService
    ) {
        this.refreshModel();
    }

    private refreshModel() {
        this.refresh = this.userService.getUsers()
            .then((users) => {
                this.users = users
                this.selected = this.users.length > 0 ? this.users[0] : undefined; 
            })
            .catch((err) => MessageBoxController.showError(this.$uibModal, err));
    }

    selectUser(userId: number): void {
       this.selected = _.find(this.users, (obj) => obj.userId == userId);
    }

    saveSelectedUser(): ng.IPromise<any> {
        return this.userService.saveUser(this.selected)
            .then(() => {})
            .catch((err) => MessageBoxController.showError(this.$uibModal, err));
    }
}