import * as express from 'express';
import * as passport from 'passport';

import { ExpressApp, ResponseService } from 'express-app';

import { IPost } from '@shared/entities/post';
import { PostRepository } from '@db/post';

export let router = express.Router();

function authenticateAndSetOnlyPublished(
    req: express.Request,
    res: express.Response,
    callback: (req: express.Request, res: express.Response, onlyPublished: boolean) => any) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        let onlyPublished = req.query.published ?
            req.query.published == 'true' :
            undefined;
        if (!user && !onlyPublished && onlyPublished !== undefined) {
            res.status(401).end();
        } else {
            if (!user && onlyPublished === undefined) {
                onlyPublished = true;
            }
            callback(req, res, onlyPublished);
        }
    })(req, res, undefined);
}

router.get('/api/postHeaders', (req: express.Request, res: express.Response) => {
    authenticateAndSetOnlyPublished(req, res, (req, res, onlyPublished) => {
        let db = new PostRepository();
        db.findPostHeaders(onlyPublished, (err, headers) => {
            if (err) {
                ExpressApp.response.handleError(res, err.message, 'Failed to get posts');
            } else {
                res.status(200).json(headers);
            }
        });
    });
});

router.get('/api/posts', (req: express.Request, res: express.Response) => {
    authenticateAndSetOnlyPublished(req, res, (req, res, onlyPublished) => {
        let db = new PostRepository();
        db.findPosts(onlyPublished, (err, headers) => {
            if (err) {
                ExpressApp.response.handleError(res, err.message, 'Failed to get posts');
            } else {
                res.status(200).json(headers);
            }
        });
    });
});

router.post('/api/posts',
    passport.authenticate('jwt', { session: false }),
    (req: express.Request, res: express.Response) => {
        let db = new PostRepository();
        let post = <IPost>req.body;
        db.savePost(post, (err) => {
            if (err) {
                ExpressApp.response.handleError(res, err.message, 'Failed to save a post');
            } else {
                res.status(201).end();
            }
        });
    });

router.get('/api/posts/:id', (req: express.Request, res: express.Response) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        let db = new PostRepository();
        let postId = req.params.id;
        db.findPost(postId, (err, post) => {
            if (err || !post) {
                ExpressApp.response.handleError(res, err ? err.message : '', `Failed to get post {Id: ${postId}}`);
            } else {
                if (!user && !post.published) {
                    res.status(401).end();
                } else {
                    res.status(200).json(post);
                }
            }
        });
    })(req, res, undefined);
});

router.put('/api/posts/:id', (req: express.Request, res: express.Response) => {
});

router.delete('/api/posts/:id',
    passport.authenticate('jwt', { session: false }),
    (req: express.Request, res: express.Response) => {
        let db = new PostRepository();
        let postId = req.params.id;
        db.removePost(postId, (err) => {
            if (err) {
                ExpressApp.response.handleError(res, err.message, `Failed to delete post {Id: ${postId}}`);
            } else {
                res.status(204).end();
            }
        });
    });