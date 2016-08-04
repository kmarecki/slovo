import * as ng from 'angular';

export enum MessageBoxType {
    Info,
    Warning,
    Error
}

export class MessageBoxController {
    static $inject = ['$uibModalInstance', 'title', 'message'];

    static show($uibModal: ng.ui.bootstrap.IModalService, type: MessageBoxType, title: string, message: string) {
        let options: ng.ui.bootstrap.IModalSettings = {
            animation: true,
            bindToController: true,
            controller: MessageBoxController,
            controllerAs: '$ctrl',
            templateUrl: 'components/message-box/message-box.template.html',
            resolve: {
                message: () => message,
                title: () => title,
            },
        };
        $uibModal.open(options);
    }


    constructor(
        private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
        public title: string,
        public message: string
    ) { }

    ok(): void {
        this.$uibModalInstance.close(true);
    }

    cancel(): void {
        this.$uibModalInstance.close(false);
    }
}

