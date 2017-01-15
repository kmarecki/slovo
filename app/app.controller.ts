import { ISettings } from '../shared/entities/settings'
import { ISettingsDataService } from './core/settings/settings.service';

export class AppController {

    static $inject = ['settingsDataService'];

    settings: ISettings;

    constructor(
        private settingsDataService: ISettingsDataService
    ) {
        this.refreshModel();
    }

    private refreshModel() {
        this.settingsDataService.getSettings(
            (settings) => {
                this.settings = settings;
            });
    }
}
