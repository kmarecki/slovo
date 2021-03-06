import * as helper from '../helper';
import { IUser, UserLevel } from '../../shared/entities/user';
import { IAuthenticateRequest, IAuthenticateResponse } from '../../shared/contracts/authenticate';

import * as chai from 'chai';
let expect = chai.expect;

describe('authentication', () => {

    before((done) => {
        helper.beforeTestSuite()
        .then(() => done())
    });

    it('POST /api/authenticate', (done) => {
        const request: IAuthenticateRequest = {
            username: 'Test1',
            password: 'qwerty'
        }
        helper.makeNonAuthorizedPostRequest(
            '/api/authenticate',
            request,
            (err, res) => {
                let response = <IAuthenticateResponse>res.body;
                expect(response.success).is.true;
                done();
            });
    });

    it('POST /api/authenticate false password', (done) => {
        const request: IAuthenticateRequest = {
            username: 'Test1',
            password: 'xxx'
        }
        helper.makeNonAuthorizedPostRequest(
            '/api/authenticate',
            request,
            (err, res) => {
                let response = <IAuthenticateResponse>res.body;
                expect(response.success).is.false;
                done();
            });
    });

})