import * as ng from 'angular';

export class LoginController {
     static $inject = ['$uibModal', '$state']

     user: string;
     password: string;

     constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $state: ng.ui.router.IStateService,
     ) {

     }     

     login() {
        this.$state.go('panel');
     }
}