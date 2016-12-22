import * as express from 'express';

import { ExpressApp, ResponseUtil } from 'express-app';

import { IPost } from '../../../shared/entities/post';
import { PostRepository } from '../../db/post';

export let router = express.Router();

router.get('/api/postHeaders', (req: express.Request, res: express.Response) => {
    let onlyPublished = req.param('published') == 'true';
    let db = new PostRepository();
    db.findPostHeaders(onlyPublished, (err, headers) => {
        if (err) {
            ExpressApp.response.handleError(res, err.message, 'Failed to get posts');
        } else {
            res.status(200).json(headers);
        }
    });
});

router.get('/api/posts', (req: express.Request, res: express.Response) => {
    let onlyPublished = req.param('published') == 'true';
    let db = new PostRepository();
    db.findPosts(onlyPublished, (err, headers) => {
        if (err) {
            ExpressApp.response.handleError(res, err.message, 'Failed to get posts');
        } else {
            res.status(200).json(headers);
        }
    });
});

router.post('/api/posts', (req: express.Request, res: express.Response) => {
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
    let db = new PostRepository();
    let postId = req.params.id;
    db.findPost(postId, (err, post) => {
        if (err) {
            ExpressApp.response.handleError(res, err.message, `Failed to get post {Id: ${postId}}`);
        } else {
            res.status(200).json(post);
        }
    });
});

router.put('/api/posts/:id', (req: express.Request, res: express.Response) => {
});

router.delete('/api/posts/:id', (req: express.Request, res: express.Response) => {
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

router.get('/api/settings', (req: express.Request, res: express.Response) => {
});