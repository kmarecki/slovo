
import { ISettings } from '../../../../shared/entities/settings'
import { ISettingsDataService } from '../../../core/settings/settings.service';
import { MessageBoxController } from '../message-box/message-box.controller';

export class SettingsController {
    static $inject = ['$uibModal', 'settingsDataService'];

    settings: ISettings;

    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private settingsDataService: ISettingsDataService
    ) {
        this.refreshModel();
    }

    private refreshModel() {
        let resource = this.settingsDataService.getSettingsResource();
        resource.query(
            (settings) => {
                this.settings = settings;
            },
            (err) => MessageBoxController.showError(this.$uibModal, err));
    }

    save(): void {
        let resource = this.settingsDataService.getSettingsResource();
        resource.save({}, this.settings,
            () => {

            },
            (err) => {
                MessageBoxController.showError(this.$uibModal, err);
            });
    }
}