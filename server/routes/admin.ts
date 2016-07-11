import * as express from 'express';

export let router = express.Router();

router.get('/admin', (req: express.Request, res: express.Response) => {
    res.render('admin/index', { model: {title: 'Admin page'} });
});
