import * as mongoose from 'mongoose';
import { MongoRepository, SchemaOptions, defaultHandler, defaultResultHandler } from 'mongoose-repos';

import { ISettings } from '../../shared/entities/settings';

interface SettingsModel extends ISettings, mongoose.Document { }

export class SettingsRepository extends MongoRepository {

    private Settings: mongoose.Model<SettingsModel>;

    getSettings(callback: (err: Error, settings: ISettings) => any): void {
        this.findOne(
            this.Settings,
            {}, 
            (err, result) => defaultResultHandler(err, result, callback));
    }

    saveSettings(settings: ISettings, callback: (err: Error) => any): void {
        this.findOneAndSave(this.Settings, {}, settings, (err) => defaultHandler(err, callback));
    }

    removeSettings(callback: (err: Error) => any): void {
        this.remove(
            this.Settings,
            {},
            callback
        );
    }

    protected addSchemas(): void {
        let schema = new mongoose.Schema({
            blogName: String,
            blogDescription: String
        });
        this.Settings = this.addModel<SettingsModel>('Setting', schema);
    }
}