import * as express from 'express';
import {Post, PostRepository} from '../db/post';

export let router = express.Router();

function handleError(
    res: express.Response,
    message: string,
    reason: string,
    code?: number) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({ 'error': message});
}

router.get('/api/postHeaders', (req: express.Request, res: express.Response) => {
    let db = new PostRepository();
    db.findPostHeaders((err, headers) => {
        if (err) {
            handleError(res, err.message, 'Failed to get posts');
        } else {
            res.status(200).json(headers);
        }
    });
});

router.get('/api/posts', (req: express.Request, res: express.Response) => {
    let db = new PostRepository();
    db.findPosts((err, headers) => {
        if (err) {
            handleError(res, err.message, 'Failed to get posts');
        } else {
            res.status(200).json(headers);
        }
    });
});

router.post('/api/posts', (req: express.Request, res: express.Response) => {
     let db = new PostRepository();
     let post = <Post>req.body;
     db.savePost(post, (err) => {
         if (err) {
              handleError(res, err.message, 'Failed to save a post');
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
            handleError(res, err.message, `Failed to get post {Id: ${postId}}`);
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
            handleError(res, err.message, `Failed to delete post {Id: ${postId}}`);
        } else {
            res.status(204).end();
        }
    });
});