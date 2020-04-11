"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = Number(process.env.PORT) || 3000;
exports.MONGO_CNN = process.env.MONGO_CNN || 'mongodb://localhost:27017/currier_db';
exports.SEED_KEY = process.env.SEED_KEY || 'currier_app_william_cq';
