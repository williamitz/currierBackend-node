"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var express_1 = require("express");
var client_model_1 = require("../models/client.model");
var config_global_1 = require("../global/config.global");
var ClientRoute = express_1.Router();
ClientRoute.post('/singIn', function (req, res) {
    var body = req.body;
    verifyNewClient(body.email, body.userName).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
        var newClient, clientDB, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!response.ok) {
                        return [2 /*return*/, res.json({
                                ok: false,
                                error: response.error
                            })];
                    }
                    if (response.showError != 0) {
                        return [2 /*return*/, res.json({
                                ok: true,
                                showError: response.showError
                            })];
                    }
                    newClient = {
                        name: body.name,
                        surname: body.surname,
                        nameComplete: body.surname + ", " + body.name,
                        email: body.email,
                        phone: body.phone,
                        address: body.address,
                        coords: {
                            latitude: body.latitude,
                            longitude: body.longitude
                        },
                        user: {
                            userName: body.userName,
                            userPassword: bcrypt_1.default.hashSync(body.userPassword, 10),
                            role: 'CLIENT_ROLE'
                        }
                    };
                    return [4 /*yield*/, client_model_1.Client.create(newClient)];
                case 1:
                    clientDB = _a.sent();
                    if (!clientDB) {
                        return [2 /*return*/, res.status(400).json({
                                ok: false,
                                error: {
                                    message: 'Error al crear clienten en la bd'
                                }
                            })];
                    }
                    clientDB.user.userPassword = '';
                    return [4 /*yield*/, jsonwebtoken_1.default.sign({ clientDB: clientDB }, config_global_1.SEED_KEY, { expiresIn: '1d' })];
                case 2:
                    token = _a.sent();
                    res.json({
                        ok: true,
                        data: clientDB,
                        showError: 0,
                        token: token
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
ClientRoute.post('/login', function (req, res) {
    var body = req.body;
    client_model_1.Client.findOne({ 'user.userName': { $eq: body.userName } }, [], function (error, clientDB) {
        if (error) {
            return res.status(400).json({
                ok: false,
                error: error
            });
        }
        if (!clientDB) {
            return res.json({
                ok: true,
                showError: 1
            });
        }
        if (!bcrypt_1.default.compareSync(body.userPassword, clientDB.user.userPassword.toString())) {
            return res.json({
                ok: true,
                showError: 2
            });
        }
        clientDB.user.userPassword = '';
        var token = jsonwebtoken_1.default.sign({ clientDB: clientDB }, config_global_1.SEED_KEY, { expiresIn: '1d' });
        res.json({
            ok: true,
            data: clientDB,
            token: token,
            showError: 0
        });
    });
});
function verifyNewClient(email, userName) {
    return new Promise(function (resolve) {
        var arrWhere = {
            // 'email': email,
            $or: [{ 'user.userName': userName }, { 'email': email }]
        };
        client_model_1.Client.findOne(arrWhere, function (error, ClientDB) {
            if (error) {
                resolve({ ok: false, error: error });
            }
            var showError = 0;
            if (ClientDB) {
                showError = 1;
                resolve({ ok: true, showError: ClientDB.statusRegister ? showError : (showError + 1) });
            }
            resolve({ ok: true, showError: showError });
        });
        // .where( {path: ['email', 'user.userName']} )
        // .or( [email, userName] );
    });
}
exports.default = ClientRoute;
