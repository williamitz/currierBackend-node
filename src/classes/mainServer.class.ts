import express from 'express';
import { PORT } from '../global/config.global';

export default class MainServer {

    private static _instance: MainServer;

    app: express.Application;
    port: number;

    constructor() {
        this.app = express();
        this.port = PORT;
    }

    onRunServer( callback: Function ) {
        this.app.listen( this.port, callback() );
    }

    public static get instance() {
        return this._instance || ( this._instance = new this());
    }

}

