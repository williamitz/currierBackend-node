"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ClientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Los nombres son requeridos']
    },
    surname: {
        type: String,
        trim: true,
        required: [true, 'Los apellidos son requeridos']
    },
    nameComplete: {
        type: String,
        trim: true,
        required: [true, 'Los nombres y apellidos son requeridos']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El teléfono es requerido']
    },
    phone: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'El email es requerido']
    },
    address: {
        type: String,
        required: [true, 'La dirección es requerida']
    },
    coords: {
        latitude: { type: Number, required: [true, 'La latitud es requerida'] },
        longitude: { type: Number, required: [true, 'La longitud es requerida'] }
    },
    user: {
        userName: { type: String, required: [true, 'El usuario es requerido'] },
        userPassword: { type: String, required: [true, 'La contraseña es requerida'] },
    },
    created: {
        type: Date,
        default: Date.now()
    }
});
exports.Client = mongoose_1.model('Client', ClientSchema);
