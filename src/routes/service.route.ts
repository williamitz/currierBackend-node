
import { Router, Request, Response } from 'express';
import { verifyToken, verifyAdminRole } from '../middlewares/verifyToken.mdl';
import { Service } from '../models/service.model';
import { Client } from '../models/client.model';
import mongoose from 'mongoose';

let ServiceRoute = Router();

ServiceRoute.post('/service/add', [verifyToken], async(req: any, res: Response) => {
    
    let body = req.body;
    let dataUser = req.user;

    let total = await Service.countDocuments({});
    let codeGenerate = `00000000${ total + 1 }`.substr(-9, 9);

    let newService = new Service({
        client:  dataUser._id,
        observation: body.observation,
        weight: body.weight,
        codeService: codeGenerate,
        coordsOrigin: body.coordsOrigin,
        coordsFinish: body.coordsFinish,
        created: new Date()
    });

    newService.save( (error, serviceDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            data: serviceDB
        });
    });

});

ServiceRoute.put('/service/update/:id', [verifyToken], async(req: any, res: Response) => {
    
    let idCurrier = req.params.id || 'xD';
    let body = req.body;
    let dataUser = req.user;

    Service.findOne( { _id: idCurrier, client: dataUser._id }, (error, currierDB: any) => {

        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        
        currierDB.observation = body.observation;
        currierDB.weight = body.weight;
        currierDB.coordsOrigin = body.coordsOrigin;
        currierDB.coordsFinish = body.coordsFinish;

        currierDB.save( (error: any, serviceDB: any) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                });
            }
    
            res.json({
                ok: true,
                data: serviceDB
            });
        });
    });

    

});

ServiceRoute.get('/service/get', [verifyToken], (req: any, res: Response) => {

    let rowsForPage = Number( req.query.rowsForPage ) || 10;
    let page = Number( req.query.page ) || 1;

    let skip = ( page - 1 ) * rowsForPage;
    
    let dataUser = req.user;

    let arrWhere = { client: dataUser._id };

    Service.find( arrWhere, [], async(error, documentsDB) => {

        if (error) {
            return res.status(400).json({
                ok: false,
                error 
            });
        }
        
        res.json({
            ok: true, 
            data: documentsDB,
            total: await Service.countDocuments( arrWhere )
        });

    })
    .skip( skip )
    .limit( rowsForPage )
    .sort({'created': -1})

});

ServiceRoute.get('/service/get/admin', [verifyToken, verifyAdminRole], async(req: any, res: Response) => {

    let rowsForPage = Number( req.query.rowsForPage ) || 10;
    let page = Number( req.query.page ) || 1;
    let qClient = req.query.qClient || '';

    let skip = ( page - 1 ) * rowsForPage;
    
    let dataUser = req.user;

    let arrWhere = { client: dataUser._id };
    let arrWhereClient: any = { };

    if (qClient !== '') {
        arrWhereClient.nameComplete = { $regex: qClient, $options: 'i' };
    }
    
    let arrIdClients: mongoose.Types.ObjectId[] = [];
    let arrClients = await Client.find( arrWhereClient, ['_id'] ) || [];
    arrClients.forEach( (objId) => {
        arrIdClients.push(  objId._id  );
    });

    Service.find( )
    .where('client')
    .in( arrIdClients )    
    .skip( skip )
    .limit( rowsForPage )
    .sort({'created': -1})
    .populate({path: 'client', select: 'nameComplete'})
    .exec( async(error, documentsDB) => {

        if (error) {
            return res.status(400).json({
                ok: false,
                error 
            });
        }
        
        res.json({
            ok: true, 
            data: documentsDB,
            total: await Service.countDocuments( )
        });

    } );

});

export default ServiceRoute;
