"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var config_global_1 = require("./src/global/config.global");
var mainServer_class_1 = __importDefault(require("./src/classes/mainServer.class"));
var main_route_1 = __importDefault(require("./src/routes/main.route"));
var server = mainServer_class_1.default.instance;
// parse application/x-www-form-urlencoded
server.app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse json
server.app.use(body_parser_1.default.json());
// config cors
server.app.use(cors_1.default({ credentials: true, origin: true }));
server.app.use(main_route_1.default);
server.onRunServer(function (error) {
    if (error)
        return console.log('Error al levantar servidor, revise dependencias  :(');
    console.log("Servidor corriendo en puerto: " + server.port);
    mongoose_1.default.connect(config_global_1.MONGO_CNN, { useNewUrlParser: true, useUnifiedTopology: true }, function (errDB) {
        if (errDB)
            return console.log('Error de conexión con base de datos :(');
        console.log('Conextado con base de datos exitosamente :)');
    });
});
