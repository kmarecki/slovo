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
            '/api/posts?published=true',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IPost[]>res.body;
                expect(response).to.have.lengthOf(2);
                done();
            });
    });

    it('GET /api/posts all posts nonauthorized', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/posts?published=false',
            (err, res) => {
                expect(res.status).equal(401);
                done();
            });
    });

    it('GET /api/posts all posts authorized', (done) => {
        helper.makeAuthorizedGetRequest(
            '/api/posts?published=false',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IPost[]>res.body;
                expect(response).to.have.lengthOf(3);
                done();
            });
    });

    it('GET /api/posts default nonauthorized', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/posts/',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IPost[]>res.body;
                expect(response).to.have.lengthOf(2);
                done();
            });
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
        );
    });

    it('GET /api/posts single post', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/posts/3',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IPost>res.body;
                const post = <IPost>helper.getTestData().posts[2];
                expect(response.postId).equal(post.postId);
                expect(response.text).equal(post.text);
                expect(response.title).equal(post.title);
                //TODO Fix equality comparision for Date
                // expect(response.date).equal(post.date);
                done();
            }
        );
    });

    it('GET /api/posts single not published post nonauthorized', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/posts/2',
            (err, res) => {
                expect(res.status).equal(401);
                done();
            }
        );
    });

    it('GET /api/posts single not published post authorized', (done) => {
        helper.makeAuthorizedGetRequest(
            '/api/posts/2',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IPost>res.body;
                const post = <IPost>helper.getTestData().posts[1];
                expect(response.postId).equal(post.postId);
                expect(response.text).equal(post.text);
                expect(response.title).equal(post.title);
                // expect(response.date).equal(post.date);
                done();
            }
        );
    });

    const modifiedTitle = 'Third Post modified';
    const modifiedText = 'Third Post text modified';

    it('POST /api/posts', (done) => {
        const post = <IPost>helper.getTestData().posts[2];
        post.title = modifiedTitle;
        post.text = modifiedText;
        helper.makeAuthorizedPostRequest(
            '/api/posts',
            post,
            (err, res) => {
                expect(res.status).equal(201);
                done();
            }
        )
    });

    it('GET /api/posts modified post', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/posts/3',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IPost>res.body;
                expect(response.text).equal(modifiedText);
                expect(response.title).equal(modifiedTitle);
                done();
            }
        );
    });

    it('DELETE /api/posts', (done) => {
        const post = <IPost>helper.getTestData().posts[2];
        post.title = modifiedTitle;
        post.text = modifiedText;
        helper.makeAuthorizedDeleteRequest(
            '/api/posts/3',
            post,
            (err, res) => {
                expect(res.status).equal(204);
                done();
            }
        )
    });

    it('GET /api/posts deleted post', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/posts/3',
            (err, res) => {
                expect(res.status).equal(500);
                done();
            }
        );
    });
});

describe('postHeaders', () => {

    before((done) => {
        helper.beforeTestSuite()
            .then(() => done())
    });

    it('GET /api/postHeaders only published', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/postHeaders?published=true',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IPost[]>res.body;
                expect(response).to.have.lengthOf(2);
                done();
            });
    });

    it('GET /api/postHeaders all posts nonauthorized', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/postHeaders?published=false',
            (err, res) => {
                expect(res.status).equal(401);
                done();
            });
    });

    it('GET /api/postHeaders all posts authorized', (done) => {
        helper.makeAuthorizedGetRequest(
            '/api/postHeaders?published=false',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IPost[]>res.body;
                expect(response).to.have.lengthOf(3);
                done();
            });
    });

    it('GET /api/postHeaders default nonauthorized', (done) => {
        helper.makeNonAuthorizedGetRequest(
            '/api/postHeaders',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IPost[]>res.body;
                expect(response).to.have.lengthOf(2);
                done();
            });
    });

    it('GET /api/postHeaders default authorized', (done) => {
        helper.makeAuthorizedGetRequest(
            '/api/postHeaders',
            (err, res) => {
                expect(res.status).equal(200);
                const response = <IPost[]>res.body;
                expect(response).to.have.lengthOf(3);
                done();
            }
        );
    });
});