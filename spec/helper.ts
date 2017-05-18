process.env['NODE_ENV'] = 'test';
process.env['NODE_CONFIG_DIR'] = './config';

import { MongoSupport } from 'mongodb-support';
import server = require('../server/server');
import { IAuthenticateRequest, IAuthenticateResponse } from '../shared/contracts/authenticate';
import { IUser } from '../shared/entities/user';

const config = require('config');

import * as chai from 'chai';
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


const db = new MongoSupport();
const testData = require('./test-data.json');

//TODO cleaner - return test data
export function getTestData(): any {
    return testData;
}
//TODO cleaner - drop identitycounters only on the first run
let firstRun = true;
export function beforeTestSuite(addTestData = true): Promise<any> {
    const drop = firstRun ? 
        () => db.dropAll() : 
        () => db.dropAllExcept('identitycounters');
    var promise = db.open(config.MongoDb.uri)
        .then(drop);
    if (addTestData) {
        for (let property in testData) {
            promise = promise.
                then(() => db.insert(property, testData[property]))
        }
    }
    firstRun = false;
    return promise;
}

export function makeNonAuthorizedGetRequest(
    uri: string,
    callback: (err, res: ChaiHttp.Response) => any): void {
    chai.request(server.app)
        .get(uri)
        .end((err, res) => callback(err, res));
}

//TODO Don't use optional parameter for request, use fluent configuration for a call
export function makeAuthorizedGetRequest(
    uri: string,
    callback: (err, res: ChaiHttp.Response) => any,
    request: IAuthenticateRequest = {
        username: 'Test1',
        password: 'qwerty'
    }): void {
    makeNonAuthorizedPostRequest(
        '/api/authenticate',
        request,
        (err, res) => {
            let response = <IAuthenticateResponse>res.body;
            expect(response.success).is.true;
            expect(response.token).is.not.null;
            let token = response.token;
            chai.request(server.app)
                .get(uri)
                .set('authorization', token)
                .end((err, res) => callback(err, res));
        }
    )
}


export function makeNonAuthorizedPostRequest(
    uri: string,
    data: any,
    callback: (err, res: ChaiHttp.Response) => any): void {
    chai.request(server.app)
        .post(uri)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(data)
        .end((err, res) => callback(err, res));
}

export function makeAuthorizedPostRequest(
    uri: string,
    data: any,
    callback: (err, res: ChaiHttp.Response) => any,
    request: IAuthenticateRequest = {
        username: 'Test1',
        password: 'qwerty'
    }): void {
    makeNonAuthorizedPostRequest(
        '/api/authenticate',
        request,
        (err, res) => {
            let response = <IAuthenticateResponse>res.body;
            expect(response.success).is.true;
            expect(response.token).is.not.null;
            let token = response.token;
            chai.request(server.app)
                .post(uri)
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('authorization', token)
                .send(data)
                .end((err, res) => callback(err, res));
        }
    )
}

export function makeAuthorizedDeleteRequest(
    uri: string,
    data: any,
    callback: (err, res: ChaiHttp.Response) => any,
    request: IAuthenticateRequest = {
        username: 'Test1',
        password: 'qwerty'
    }): void {
    makeNonAuthorizedPostRequest(
        '/api/authenticate',
        request,
        (err, res) => {
            let response = <IAuthenticateResponse>res.body;
            expect(response.success).is.true;
            expect(response.token).is.not.null;
            let token = response.token;
            chai.request(server.app)
                .del(uri)
                .set('authorization', token)
                .send(data)
                .end((err, res) => callback(err, res));
        }
    )
}