process.env['NODE_ENV'] = 'test';
process.env['NODE_CONFIG_DIR'] = '../config';

import * as chai from 'chai';
let chaiHttp = require('chai-http');
let expect = chai.expect;
// let should = chai.should();

import server = require('../../server/server');
import {IAliveResponse} from '../../shared/contracts/alive';


chai.use(chaiHttp);

describe('alive', () => {

    beforeEach((done) => done());
    afterEach((done) => done());

    it('/GET alive', (done) => {
        chai.request(server.app)
            .get('/api/alive')
            .end((err, res) => {
                expect(res.status).equal(200);
                let response = <IAliveResponse>res.body;
                expect(response).is.not.null;
                expect(response.isConnectedToDatabase).is.true;
                expect(response.version).equal('0.0.0');
                done();
            });
    });
});
