import * as ng from 'angular';
import { ISettings } from '../../../shared/entities/settings';


export interface ISettingsResource extends ng.resource.IResourceClass<ng.resource.IResource<ISettings>> { }


export interface ISettingsDataService {
    getSettingsResource(): ISettingsResource;
}

export class SettingsDataService implements ISettingsDataService {
    static $inject = ['$resource'];

    constructor(private $resource: ng.resource.IResourceService) { }

    getSettingsResource(): ISettingsResource {
        return <ISettingsResource>this.$resource('/api/siteSettings');
    };
}
