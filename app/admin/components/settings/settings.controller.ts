
import { ISettings } from '../../../../shared/entities/settings'
import { ISettingsDataService } from '../../../core/settings/settings.service';
import { MessageBoxController } from '../message-box/message-box.controller';

export class SettingsController {
    static $inject = ['$uibModal', '$state', 'settingsDataService'];

    settings: ISettings;

    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $state: ng.ui.router.IStateService,
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
                this.$state.go('panel.posts');
            },
            (err) => {
                MessageBoxController.showError(this.$uibModal, err);
            });
    }
}