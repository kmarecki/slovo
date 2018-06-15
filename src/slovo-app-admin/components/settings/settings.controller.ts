import { ISettings } from '@shared/entities/settings'
import { ISettingsDataService } from '@core/settings/settings.service';
import { MessageBoxController } from '../message-box/message-box.controller';

export class SettingsController {
    static $inject = ['$uibModal', '$state', 'settingsDataService'];

    settings: ISettings;
    refresh: ng.IPromise<any>;

    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $state: ng.ui.IStateService,
        private settingsDataService: ISettingsDataService
    ) {
        this.refreshModel();
    }

    private refreshModel() {
        this.refresh = this.settingsDataService.getSettings()
            .then((settings) => this.settings = settings)
            .catch((err) => MessageBoxController.showError(this.$uibModal, err));
    }

    save(): ng.IPromise<any> {
        return this.settingsDataService.saveSettings(this.settings)
            .then(() => this.$state.go('panel.posts'))
            .catch((err) => MessageBoxController.showError(this.$uibModal, err));
    }
}