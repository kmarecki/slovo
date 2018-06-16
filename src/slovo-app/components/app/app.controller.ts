import { ISettings } from '@shared/entities/settings'
import { ISettingsDataService } from '@core/settings/settings.service';

export class AppController {

    static $inject = ['settingsDataService'];

    settings: ISettings;
    refresh: ng.IPromise<any>;

    constructor(
        private settingsDataService: ISettingsDataService
    ) {
        this.refreshModel();
    }

    private refreshModel() {
        this.refresh = this.settingsDataService.getSettings()
            .then((settings) => this.settings = settings);
    }
}
