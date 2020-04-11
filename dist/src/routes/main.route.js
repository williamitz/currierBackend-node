"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var client_route_1 = __importDefault(require("./client.route"));
var service_route_1 = __importDefault(require("./service.route"));
var auth_route_1 = __importDefault(require("./auth.route"));
var MainRouter = express_1.Router();
MainRouter.use(client_route_1.default);
MainRouter.use(service_route_1.default);
MainRouter.use(auth_route_1.default);
exports.default = MainRouter;
