import * as ng from 'angular';

import { IAuthService } from '../../services/auth.service';
import { MessageBoxController, MessageBoxType } from '../message-box/message-box.controller';

export class LoginController {
    static $inject = ['$uibModal', '$state', 'services.auth']

    username: string;
    password: string;

    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $state: ng.ui.IStateService,
        private authService: IAuthService
    ) {

    }

    login() {
        this.authService
            .login(this.username, this.password)
            .then(() => {
                this.$state.go('panel');
            },
            (msg) => MessageBoxController.show(
                this.$uibModal, MessageBoxType.Error, '', msg));
    }
}