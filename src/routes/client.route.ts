import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import { Client, IClient } from '../models/client.model';
import IResponse from '../interfaces/response.interface';
import { SEED_KEY } from '../global/config.global';

let ClientRoute = Router();

ClientRoute.post( '/singIn', (req: Request, res: Response) => {

    let body = req.body;

    verifyNewClient( body.email, body.userName ).then( async (response) => {
        
        if (!response.ok) {
            return res.json({
                ok: false,
                error: response.error
            });
        }

        if (response.showError != 0) {
            return res.json({
                ok: true,
                showError: response.showError
            });
        }

        let newClient = {
            name: body.name,
            surname: body.surname,
            nameComplete: `${ body.surname }, ${ body.name }`,
            email: body.email,
            phone: body.phone,
            address: body.address,
            coords: {
                latitude: body.latitude,
                longitude: body.longitude
            },
            user: {
                userName: body.userName,
                userPassword: bcrypt.hashSync( body.userPassword, 10 ),
                role: 'CLIENT_ROLE'
            }
        };

        let clientDB = await Client.create( newClient );
        if (!clientDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Error al crear clienten en la bd'
                }
            });
        }

        clientDB.user.userPassword = '';
        let token = await jwt.sign({clientDB} , SEED_KEY, {expiresIn: '1d'} );
        res.json({ 
            ok: true,
            data: clientDB,
            showError: 0,
            token
        });

    });

});


ClientRoute.post('/login', (req: Request, res: Response) => {
    
    let body = req.body; 

    Client.findOne({ 'user.userName': {  $eq : body.userName } }, [], (error, clientDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        
        if (!clientDB) {
            return res.json({
                ok: true,
                showError: 1 
            });
        }


        if (!bcrypt.compareSync( body.userPassword, clientDB.user.userPassword.toString() ) ) {
            return res.json({
                ok: true,
                showError: 2
            })
        }

        clientDB.user.userPassword = '';
        let token = jwt.sign( {clientDB}, SEED_KEY,{ expiresIn: '1d' } );
        res.json({
            ok: true,
            data: clientDB,
            token,
            showError: 0
        });

    });

});

function verifyNewClient( email: string, userName: string ): Promise<IResponse> {
    return new Promise( (resolve) => {

        let arrWhere = {
            // 'email': email,
            $or: [ { 'user.userName': userName }, {'email': email} ]
        };

        Client.findOne( arrWhere, (error, ClientDB) => {
            if (error) {
                resolve({ ok: false, error });
            }
            let showError = 0;
            if (ClientDB) {
                showError = 1;
                resolve( { ok: true, showError: ClientDB.statusRegister ? showError : (showError + 1) } );
            }

            resolve( { ok: true, showError } );

        });
        // .where( {path: ['email', 'user.userName']} )
        // .or( [email, userName] );

    });
}


export default ClientRoute;
