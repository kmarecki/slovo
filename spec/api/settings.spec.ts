process.env['NODE_ENV'] = 'test';
process.env['NODE_CONFIG_DIR'] = '../config';

import { MongoHelper } from '../helpers/mongo';

import server = require('../../server/server');
import { IAliveResponse } from '../../shared/contracts/alive';
import { SettingsRepository } from '../../server/db/settings';
import { ISettings } from '../../shared/entities/settings';

import * as chai from 'chai';
let chaiHttp = require('chai-http');
let expect = chai.expect;
// let should = chai.should();

let config = require('config');

chai.use(chaiHttp);

describe('settings', () => {
    const db = new MongoHelper();
    const settings: ISettings = {
        blogDescription: "Some description",
        blogName: "The Blog"
    }

    beforeEach((done) => {
        db.open(config.MongoDb.uri)
            .then(() => db.dropAll())
            .then(() => db.insert('settings', settings))
            .then(() => done());
    });
    //afterEach((done) => done());

    it('/GET settings', (done) => {
        chai.request(server.app)
            .get('/api/siteSettings')
            .end((err, res) => {
                expect(res.status).equal(200);
                let response = <ISettings>res.body;
                expect(response).is.not.null;
                expect(response.blogDescription).equal(settings.blogDescription);
                expect(response.blogName).equal(settings.blogName);
                done();
            });
    });
});
