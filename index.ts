import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import { MONGO_CNN } from './src/global/config.global';

import MainServer from './src/classes/mainServer.class';
import MainRouter from './src/routes/main.route';

const server = MainServer.instance;

// parse application/x-www-form-urlencoded
server.app.use( bodyParser.urlencoded({ extended: false }) );

// parse json
server.app.use( bodyParser.json() );

// config cors
server.app.use( cors({credentials: true, origin: true}) );

server.app.use( MainRouter );


server.onRunServer( (error: any) => {

    if (error) return console.log('Error al levantar servidor, revise dependencias  :(');
    
    console.log(`Servidor corriendo en puerto: ${ server.port }`);

    mongoose.connect( MONGO_CNN, { useNewUrlParser: true, useUnifiedTopology: true }, (errDB) => {

        if (errDB) return console.log('Error de conexión con base de datos :(');

        console.log('Conextado con base de datos exitosamente :)');
    });
});