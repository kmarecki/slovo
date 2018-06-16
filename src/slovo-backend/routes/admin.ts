import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as passport from 'passport';

export class AdminRoutes {
    public router = express.Router();

    constructor(root: string) {
        const indexPage = (req: express.Request, res: express.Response) => {
            const indexPath = path.join(root, 'index.html');
            res.sendFile(indexPath);
        };

        this.router.get('/admin/', indexPage);
        this.router.get('/admin/login', indexPage);
        this.router.get('/admin/signup', indexPage);
        this.router.get('/admin/comments(/*)?', indexPage);
        this.router.get('/admin/posts(/*)?', indexPage);
        this.router.get('/admin/settings(/*)?', indexPage);
        this.router.get('/admin/users(/*)?', indexPage);

        this.router.get(
            '/admin/*',
            //passport.authenticate('jwt', { session: false }),
            
            (req: express.Request, res: express.Response) => {
                const toplevelPath = req.path.replace('admin/','');
                const filePath = path.join(root, toplevelPath);
                fs.stat(filePath, (err, stats) => {
                    if (stats && stats.isFile()) {
                        res.sendFile(filePath);
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.write('404 Not Found\n');
                        res.end();
                    }
                });
            }
        );
    }
}
