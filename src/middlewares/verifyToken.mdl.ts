import jwt from 'jsonwebtoken';
import { Router, Request, Response, NextFunction } from 'express';
import { SEED_KEY } from '../global/config.global';

export const verifyToken = ( req: any, res: Response, next: NextFunction ) => {

    let token = req.get('Authorization') || 'xD';

    jwt.verify( token, SEED_KEY, (error: any, decoded: any) => {
        if (error) {
            return res.status(401).json({
                ok: false,
                error
            });
        }

        req.user = decoded.clientDB;
        next();
    });

};

export const verifyAdminRole = (req: any, res: Response, next: NextFunction) => {
    
    let rolesValid = ['ADMIN_ROLE'];
    if ( rolesValid.indexOf( req.user.user.role ) !== 0 ) {
        return res.status(401).json({
            ok: false,
            error: {
                message: 'No tiene acceso a listar los servicios, comuniquese con el ADMINISTRADOR'
            }
        });
    }
    
    next();
    
};