import * as helper from '../helper';
import { IPost, IPostHeader } from '../../shared/entities/post';

import * as chai from 'chai';
const expect = chai.expect;

describe('posts', () => {

    before((done) => {
        helper.beforeTestSuite()
            .then(() => done())
    });

    it('GET /api/posts only published', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/posts/?published=true',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IPost[]>res.body;
                expect(response).to.have.lengthOf(2);
                done();
            }
        )
    });

    it('GET /api/posts all posts nonauthorized', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/posts/?published=false',
            (err, res) => {
                expect(res.status).equal(401);
                done();
            }
        )
    });

    it('GET /api/posts all posts authorized', (done) => {
        helper.makeAuthorizedGetRequest(
            '/api/posts/?published=false',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IPost[]>res.body;
                expect(response).to.have.lengthOf(3);
                done();
            }
        )
    });

    it('GET /api/posts default nonauthorized', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/posts/',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IPost[]>res.body;
                expect(response).to.have.lengthOf(2);
                done();
            }
        )
    });
    
    it('GET /api/posts default authorized', (done) => {
        helper.makeAuthorizedGetRequest(
            '/api/posts/',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IPost[]>res.body;
                expect(response).to.have.lengthOf(3);
                done();
            }
        )
    });
});