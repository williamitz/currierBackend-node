"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_global_1 = require("../global/config.global");
var AuthRoute = express_1.Router();
AuthRoute.put('/verify/token', function (req, res) {
    var token = req.get('Authorization') || 'xD';
    jsonwebtoken_1.default.verify(token, config_global_1.SEED_KEY, function (error, decoded) {
        if (error) {
            return res.status(401).json({
                ok: false,
                error: error
            });
        }
        res.json({
            ok: true
        });
    });
});
exports.default = AuthRoute;
