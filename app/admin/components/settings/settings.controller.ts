
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
        this.settingsDataService.getSettings(
            (settings) => {
                this.settings = settings;
            },
            (err) => MessageBoxController.showError(this.$uibModal, err));
    }

    save(): void {
        this.settingsDataService.saveSettings(this.settings,
            () => {
                this.$location.path('/posts');
            },
            (err) => {
                MessageBoxController.showError(this.$uibModal, err);
            });
    }
}