import * as ng from 'angular';
import { ISettings } from '../../../shared/entities/settings';


export interface ISettingsResource extends ng.resource.IResourceClass<ng.resource.IResource<ISettings>> { }


export interface ISettingsDataService {
    getSettings(result: (settings: ISettings) => any, err?: (err) => any);

    saveSettings(settings: ISettings, success: () => any, err?: (err) => any);
}

export class SettingsDataService implements ISettingsDataService {
    static $inject = ['$resource'];

    constructor(private $resource: ng.resource.IResourceService) { }

    private getSettingsResource(): ISettingsResource {
        return <ISettingsResource>this.$resource('/api/siteSettings');
    };

    getSettings(result: (settings: ISettings) => any, err?: (error) => any) {
        let resource = this.getSettingsResource();
        resource.get(
            (settings) => {
                result(settings);
            },
            (error) => {
                err(error);
            });
    }

    saveSettings(settings: ISettings, success: () => any, err?: (error) => any) {
        let resource = this.getSettingsResource();
        resource.save({}, settings,
            () => {
                success();
            },
            (error) => {
                err(error);
            });
    }
}
