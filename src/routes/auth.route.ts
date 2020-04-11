
import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SEED_KEY } from '../global/config.global';

let AuthRoute = Router();

AuthRoute.put('/verify/token', (req: Request, res: Response) => {
    let token = req.get('Authorization') || 'xD';

    jwt.verify( token, SEED_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true
        });
    });
});

export default AuthRoute;