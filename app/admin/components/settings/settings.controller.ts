
import { ISettings } from '../../../../shared/entities/settings'
import { ISettingsDataService } from '../../../core/settings/settings.service';
import { MessageBoxController } from '../message-box/message-box.controller';

export class SettingsController {
    static $inject = ['$uibModal', '$location', 'settingsDataService'];

    settings: ISettings;

    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $location: ng.ILocationService,
        private settingsDataService: ISettingsDataService
    ) {
        this.refreshModel();
    }

    private refreshModel() {
        let resource = this.settingsDataService.getSettingsResource();
        resource.get(
            (settings) => {
                this.settings = settings;
            },
            (err) => MessageBoxController.showError(this.$uibModal, err));
    }

    save(): void {
        let resource = this.settingsDataService.getSettingsResource();
        resource.save({}, this.settings,
            () => {
                this.$location.path('/posts');
            },
            (err) => {
                MessageBoxController.showError(this.$uibModal, err);
            });
    }
}