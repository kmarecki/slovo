import * as helper from '../helper';
import { IUser } from '../../shared/entities/user';
import { IAuthenticateRequest, IAuthenticateResponse } from '../../shared/contracts/authenticate';

import * as chai from 'chai';
let expect = chai.expect;

describe('users', () => {

    before((done) => {
        helper.beforeTestSuite()
            .then(() => done())
    });

    //Don't mess with user Test1, he is used for default authorization
    it('GET /api/users/:id', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/users/2',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IUser>res.body;
                const user = <IUser>helper.getTestData().users[1];
                expect(response).is.not.null;
                expect(response.userName).equal(user.userName);
                expect(response.userId).equal(user.userId);
                expect(response.email).equal(user.email);
                done();
            }
        );
    })

    const modifiedName = "Test2 modified";
    const modifiedEmail = "modified@xxx.com";
    const modifiedPassword ="qwerty2";

    it('POST /api/users', (done) => {
        const user = <IUser>helper.getTestData().users[1];
        user.userName = modifiedName;
        user.email = modifiedEmail;
        //TODO password should not be modified by user update. There should be explicit method for changing a password
        user.password = "qwerty";
        helper.makeAuthorizedPostRequest(
            '/api/users',
            user,
            (err, res) => {
                expect(res.status).equal(201);
                done();
            }
        )
    });

    it('GET /api/users/:id after user updated', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/users/2',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IUser>res.body;
                expect(response).is.not.null;
                expect(response.userName).equal(modifiedName);
                expect(response.email).equal(modifiedEmail);
                done();
            }
        );
    });

    it('POST /api/authenticate after user updated', (done) => {
        const request: IAuthenticateRequest = {
            username: modifiedName,
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

    it('POST /api/users password modified', (done) => {
        const user = <IUser>helper.getTestData().users[1];
        user.password = modifiedPassword;
        helper.makeAuthorizedPostRequest(
            '/api/users',
            user,
            (err, res) => {
                expect(res.status).equal(201);
                done();
            }
        )
    });

    
    it('POST /api/authenticate after password updated', (done) => {
        const request: IAuthenticateRequest = {
            username: modifiedName,
            password: modifiedPassword
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

});