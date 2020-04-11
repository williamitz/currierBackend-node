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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var verifyToken_mdl_1 = require("../middlewares/verifyToken.mdl");
var service_model_1 = require("../models/service.model");
var client_model_1 = require("../models/client.model");
var ServiceRoute = express_1.Router();
ServiceRoute.post('/service/add', [verifyToken_mdl_1.verifyToken], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var body, dataUser, total, codeGenerate, newService;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                dataUser = req.user;
                return [4 /*yield*/, service_model_1.Service.countDocuments({})];
            case 1:
                total = _a.sent();
                codeGenerate = ("00000000" + (total + 1)).substr(-9, 9);
                newService = new service_model_1.Service({
                    client: dataUser._id,
                    observation: body.observation,
                    weight: body.weight,
                    codeService: codeGenerate,
                    coordsOrigin: body.coordsOrigin,
                    coordsFinish: body.coordsFinish,
                    created: new Date()
                });
                newService.save(function (error, serviceDB) {
                    if (error) {
                        return res.status(400).json({
                            ok: false,
                            error: error
                        });
                    }
                    res.json({
                        ok: true,
                        data: serviceDB
                    });
                });
                return [2 /*return*/];
        }
    });
}); });
ServiceRoute.put('/service/update/:id', [verifyToken_mdl_1.verifyToken], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var idCurrier, body, dataUser;
    return __generator(this, function (_a) {
        idCurrier = req.params.id || 'xD';
        body = req.body;
        dataUser = req.user;
        service_model_1.Service.findOne({ _id: idCurrier, client: dataUser._id }, function (error, currierDB) {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    error: error
                });
            }
            currierDB.observation = body.observation;
            currierDB.weight = body.weight;
            currierDB.coordsOrigin = body.coordsOrigin;
            currierDB.coordsFinish = body.coordsFinish;
            currierDB.save(function (error, serviceDB) {
                if (error) {
                    return res.status(400).json({
                        ok: false,
                        error: error
                    });
                }
                res.json({
                    ok: true,
                    data: serviceDB
                });
            });
        });
        return [2 /*return*/];
    });
}); });
ServiceRoute.get('/service/get', [verifyToken_mdl_1.verifyToken], function (req, res) {
    var rowsForPage = Number(req.query.rowsForPage) || 10;
    var page = Number(req.query.page) || 1;
    var skip = (page - 1) * rowsForPage;
    var dataUser = req.user;
    var arrWhere = { client: dataUser._id };
    service_model_1.Service.find(arrWhere, [], function (error, documentsDB) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (error) {
                        return [2 /*return*/, res.status(400).json({
                                ok: false,
                                error: error
                            })];
                    }
                    _b = (_a = res).json;
                    _c = {
                        ok: true,
                        data: documentsDB
                    };
                    return [4 /*yield*/, service_model_1.Service.countDocuments(arrWhere)];
                case 1:
                    _b.apply(_a, [(_c.total = _d.sent(),
                            _c)]);
                    return [2 /*return*/];
            }
        });
    }); })
        .skip(skip)
        .limit(rowsForPage)
        .sort({ 'created': -1 });
});
ServiceRoute.get('/service/get/admin', [verifyToken_mdl_1.verifyToken, verifyToken_mdl_1.verifyAdminRole], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var rowsForPage, page, qClient, skip, dataUser, arrWhere, arrWhereClient, arrIdClients, arrClients;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                rowsForPage = Number(req.query.rowsForPage) || 10;
                page = Number(req.query.page) || 1;
                qClient = req.query.qClient || '';
                skip = (page - 1) * rowsForPage;
                dataUser = req.user;
                arrWhere = { client: dataUser._id };
                arrWhereClient = {};
                if (qClient !== '') {
                    arrWhereClient.nameComplete = { $regex: qClient, $options: 'i' };
                }
                arrIdClients = [];
                return [4 /*yield*/, client_model_1.Client.find(arrWhereClient, ['_id'])];
            case 1:
                arrClients = (_a.sent()) || [];
                arrClients.forEach(function (objId) {
                    arrIdClients.push(objId._id);
                });
                service_model_1.Service.find()
                    .where('client')
                    .in(arrIdClients)
                    .skip(skip)
                    .limit(rowsForPage)
                    .sort({ 'created': -1 })
                    .populate({ path: 'client', select: 'nameComplete' })
                    .exec(function (error, documentsDB) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                if (error) {
                                    return [2 /*return*/, res.status(400).json({
                                            ok: false,
                                            error: error
                                        })];
                                }
                                _b = (_a = res).json;
                                _c = {
                                    ok: true,
                                    data: documentsDB
                                };
                                return [4 /*yield*/, service_model_1.Service.countDocuments()];
                            case 1:
                                _b.apply(_a, [(_c.total = _d.sent(),
                                        _c)]);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
exports.default = ServiceRoute;
