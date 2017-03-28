process.env['NODE_ENV'] = 'test';
process.env['NODE_CONFIG_DIR'] = '../config';

import { MongoSupport } from './mongo.support';
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

//TODO return test data in a smarter way
export function getTestData(): any {
    return testData;
}
export function beforeTestSuite(): Promise<any> {
    var promise = db.open(config.MongoDb.uri)
        .then(() => db.dropAll());
    for (let property in testData) {
        promise = promise.
            then(() => db.insert(property, testData[property]))
    }
    return promise;
}

export function makeNonAuthorizedGetRequest(
    uri: string,
    callback: (err, res: ChaiHttp.Response) => any): void {
    chai.request(server.app)
        .get(uri)
        .end((err, res) => callback(err, res));
}

export function makeAuthorizedGetRequest(
    uri: string,
    callback: (err, res: ChaiHttp.Response) => any): void {
    const request: IAuthenticateRequest = {
        username: 'Test1',
        password: 'qwerty'
    }
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
    callback: (err, res: ChaiHttp.Response) => any): void {
    const request: IAuthenticateRequest = {
        username: 'Test1',
        password: 'qwerty'
    }
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
    callback: (err, res: ChaiHttp.Response) => any): void {
    const request: IAuthenticateRequest = {
        username: 'Test1',
        password: 'qwerty'
    }
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