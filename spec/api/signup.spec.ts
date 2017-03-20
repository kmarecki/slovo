import * as helper from '../helper';
import { IUser, UserLevel } from '../../shared/entities/user';
import { IAuthenticateRequest, IAuthenticateResponse } from '../../shared/contracts/authenticate';
import { ISignupRequest, ISignupResponse} from '../../shared/contracts/signup';

import * as chai from 'chai';
let expect = chai.expect;

describe('signup', () => {

    before((done) => {
        helper.beforeTestSuite()
        .then(() => done())
    });

    it('POST /api/signup', (done) => {
        const request: ISignupRequest = {
            username: 'Test2',
            password: 'qwerty',
            email: 'test@xxx.com'

        }
        helper.makeNonAuthorizedPostRequest(
            '/api/signup',
            request,
            (err, res) => {
                let response = <ISignupResponse>res.body;
                expect(response.success).is.true;
                done();
            });
    });

    it('POST /api/authenticate after signup', (done) => {
        const request: IAuthenticateRequest = {
            username: 'Test2',
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

})