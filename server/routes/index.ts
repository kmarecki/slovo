import * as express from 'express';

export let router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.render('index', { });
});
