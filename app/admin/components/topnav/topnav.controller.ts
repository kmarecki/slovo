import { IAuthService } from '../../services/auth.service';
import { IRootScopeService } from 'angular';
import { TopNavModel } from './topnav.model';
import { MessageBoxController, MessageBoxType } from '../message-box/message-box.controller';
import { TransitionService } from '@uirouter/core';

export class TopNavController {
    static $inject = ['$rootScope', '$uibModal', '$state', '$transitions', 'services.auth'];

    username: string;
    model: TopNavModel;

    constructor(
        private $rootScope: IRootScopeService,
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $state: ng.ui.IStateService,
        private $transitions: TransitionService,
        private authService: IAuthService
    ) {
        $transitions.onSuccess({}, (trans) => {
            this.refreshModel();
        });

        this.model = new TopNavModel();
        this.refreshModel();
    }

    private refreshModel() {
        this.model.username = this.authService.getUserName();
    }

    logout(): ng.IPromise<any> {
        return this.authService
            .logout()
            .then(() => this.$state.go('login'))
            .catch((msg) =>
                MessageBoxController.show(this.$uibModal, MessageBoxType.Error, '', msg)
            );
    }
}
