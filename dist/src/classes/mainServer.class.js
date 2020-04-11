"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_global_1 = require("../global/config.global");
var MainServer = /** @class */ (function () {
    function MainServer() {
        this.app = express_1.default();
        this.port = config_global_1.PORT;
    }
    MainServer.prototype.onRunServer = function (callback) {
        this.app.listen(this.port, callback());
    };
    Object.defineProperty(MainServer, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    return MainServer;
}());
exports.default = MainServer;
