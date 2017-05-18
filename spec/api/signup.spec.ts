import * as helper from '../helper';
import { IUser, UserLevel } from '../../shared/entities/user';
import { IAuthenticateRequest, IAuthenticateResponse } from '../../shared/contracts/authenticate';
import { ISignupRequest, ISignupResponse } from '../../shared/contracts/signup';

import * as chai from 'chai';
let expect = chai.expect;

describe('signup', () => {

    const userName1 = 'Test2';
    const password1 = 'qwerty';
    const email1 = 'test2@xxx.com';

    const userName2 = 'Test3';
    const password2 = 'qwerty';
    const email2 = 'test3@xxx.com';

    before((done) => {
        helper.beforeTestSuite(false)
            .then(() => done());
    });

    it('POST /api/signup', (done) => {
        const request: ISignupRequest = {
            username: userName1,
            password: password1,
            email: email1

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
            username: userName2,
            password: password2,
            email: email2

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
            username: userName1,
            password: password1
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
            username: userName2,
            password: password2
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
            username: userName2,
            password: password2
        }
        helper.makeAuthorizedGetRequest(
            '/api/users',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IUser[]>res.body;
                expect(response.length).equal(2);

                const user1 = response[0];
                expect(user1.userName).equal(userName1)
                expect(user1.email).equal(email1);
                expect(user1.userId).equal(1);

                const user2 = response[1];
                expect(user2.userName).equal(userName2)
                expect(user2.email).equal(email2);
                expect(user2.userId).equal(2);

                done();
            },
            request
        );
    });

})