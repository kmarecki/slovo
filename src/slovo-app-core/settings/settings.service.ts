import * as ng from 'angular';
import { ISettings } from '@shared/entities/settings';


export interface ISettingsResource extends ng.resource.IResourceClass<ng.resource.IResource<ISettings>> { }


export interface ISettingsDataService {
    getSettings(): ng.IPromise<ISettings>;

    saveSettings(settings: ISettings): ng.IPromise<any>;
}

export class SettingsDataService implements ISettingsDataService {
    static $inject = ['$resource', '$q'];

    constructor(
        private $resource: ng.resource.IResourceService,
        private $q: ng.IQService) { }

    private getSettingsResource(): ISettingsResource {
        return <ISettingsResource>this.$resource('/api/settings');
    };

    getSettings(): ng.IPromise<ISettings> {
        return this.$q((resolve, reject) => {
            let resource = this.getSettingsResource();
            resource.get(
                (settings) => resolve(settings),
                (error) => reject(error));
        });
    }

    saveSettings(settings: ISettings): ng.IPromise<any> {
        return this.$q((resolve, reject) => {
            let resource = this.getSettingsResource();
            resource.save({}, settings,
                () => resolve(),
                (error) => reject(error));
        });
    }
}
