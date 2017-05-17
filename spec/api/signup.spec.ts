import * as helper from '../helper';
import { IUser, UserLevel } from '../../shared/entities/user';
import { IAuthenticateRequest, IAuthenticateResponse } from '../../shared/contracts/authenticate';
import { ISignupRequest, ISignupResponse } from '../../shared/contracts/signup';

import * as chai from 'chai';
let expect = chai.expect;

describe('signup', () => {

    before((done) => {
        helper.beforeTestSuite(false)
            .then(() => done());
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

    it('POST /api/signup, second user', (done) => {
        const request: ISignupRequest = {
            username: 'Test3',
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

    it('POST /api/authenticate after signup, second user', (done) => {
        const request: IAuthenticateRequest = {
            username: 'Test3',
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

    it('GET /api/users', (done) => {
        const request: IAuthenticateRequest = {
            username: 'Test3',
            password: 'qwerty'
        }
        helper.makeAuthorizedGetRequest(
            '/api/users',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IUser[]>res.body;
                expect(response.length).equal(2);
                done();
            },
            request
        );
    });

})