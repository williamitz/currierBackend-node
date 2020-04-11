import {Router} from 'express';
import ClientRoute from './client.route';
import ServiceRoute from './service.route';
import AuthRoute from './auth.route';

let MainRouter = Router();

MainRouter.use( ClientRoute );
MainRouter.use( ServiceRoute );
MainRouter.use( AuthRoute );


export default MainRouter;