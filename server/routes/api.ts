import * as express from 'express';
import {PostRepository} from '../db/post';

export let router = express.Router();

function handleError(
    res: express.Response,
    message: string,
    reason: string,
    code?: number) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({ 'error': message});
}

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
});

router.get('/api/posts/:id', (req: express.Request, res: express.Response) => {
});

router.put('/api/posts/:id', (req: express.Request, res: express.Response) => {
});

router.delete('/api/posts/:id', (req: express.Request, res: express.Response) => {
});