import * as helper from '../helper';
import * as chai from 'chai';
let expect = chai.expect;

import server = require('../../server/server');
import { IAliveResponse } from '../../shared/contracts/alive';

describe('alive', () => {

    beforeEach((done) => done());
    afterEach((done) => done());

    it('GET /api/alive', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/alive',
            (err, res) => {
                expect(res.status).equal(200);
                let response = <IAliveResponse>res.body;
                expect(response).is.not.null;
                expect(response.isConnectedToDatabase).is.true;
                expect(response.version).equal('0.0.0');
                done();
            });
    });
});
