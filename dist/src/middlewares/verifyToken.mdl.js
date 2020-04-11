"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_global_1 = require("../global/config.global");
exports.verifyToken = function (req, res, next) {
    var token = req.get('Authorization') || 'xD';
    jsonwebtoken_1.default.verify(token, config_global_1.SEED_KEY, function (error, decoded) {
        if (error) {
            return res.status(401).json({
                ok: false,
                error: error
            });
        }
        req.user = decoded.clientDB;
        next();
    });
};
exports.verifyAdminRole = function (req, res, next) {
    var rolesValid = ['ADMIN_ROLE'];
    if (rolesValid.indexOf(req.user.user.role) !== 0) {
        return res.status(401).json({
            ok: false,
            error: {
                message: 'No tiene acceso a listar los servicios, comuniquese con el ADMINISTRADOR'
            }
        });
    }
    next();
};
