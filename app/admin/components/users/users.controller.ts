import * as ng from 'angular';

import { IUser } from '../../../../shared/entities/user';
import { IUserDataService } from '../../services/user.service';
import { MessageBoxController } from '../message-box/message-box.controller';

export class UsersController {
    static $inject = ['$uibModal', 'services.user'];

    users: IUser[];
    refresh: ng.IPromise<any>

    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private userService: IUserDataService
    ) {
        this.refreshModel();
    }

    private refreshModel() {
        this.refresh = this.userService.getUsers()
            .then((users) => this.users = users)
            .catch((err) => MessageBoxController.showError(this.$uibModal, err));
    }
}