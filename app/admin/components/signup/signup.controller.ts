import * as ng from 'angular';

import { IAuthService } from '../../services/auth.service';
import { MessageBoxController, MessageBoxType } from '../message-box/message-box.controller';

export class SignupController {
    static $inject = ['$uibModal', '$state', 'services.auth']

    username: string;
    email: string;
    password: string;
    repeatPassword: string;


    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $state: ng.ui.IStateService,
        private authService: IAuthService
    ) {

    }

    signup() {
        this.authService
            .signup(this.username, this.password, this.email)
            .then(() => this.$state.go('login'))
            .catch(
            (msg) => MessageBoxController.show(
                this.$uibModal, MessageBoxType.Error, '', msg));
    }
}