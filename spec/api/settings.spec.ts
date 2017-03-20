import * as helper from '../helper';
import { IAliveResponse } from '../../shared/contracts/alive';
import { SettingsRepository } from '../../server/db/settings';
import { ISettings } from '../../shared/entities/settings';

import * as chai from 'chai';
let expect = chai.expect;

describe('settings', () => {

    const modifiedSettings = {
        blogDescription: 'Some description - modified',
        blogName: 'The Blog - modified'
    };

    before((done) => helper.beforeTestSuite()
        .then(() => done()));

    it('/GET siteSettings', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/siteSettings',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <ISettings>res.body;
                const settings = helper.getTestData().settings[0];
                expect(response).is.not.null;
                expect(response.blogDescription).equal(settings.blogDescription);
                expect(response.blogName).equal(settings.blogName);
                done();
            });
    });

    it('/POST siteSettings', (done) => {
        helper.makeAuthorizedPostRequest(
            '/api/siteSettings',
            modifiedSettings,
            (err, res) => {
                expect(res.status).equal(201);
                done();
            });
    });

    it('/GET siteSettings after update', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/siteSettings',
            (err, res) => {
                expect(res.status).equal(200);
                let response = <ISettings>res.body;
                expect(response).is.not.null;
                expect(response.blogDescription).equal(modifiedSettings.blogDescription);
                expect(response.blogName).equal(modifiedSettings.blogName);
                done();
            });
    });

});
