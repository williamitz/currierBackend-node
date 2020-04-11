"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ServiceSchema = new mongoose_1.Schema({
    client: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Client',
        required: [true, 'El id del cliente es requerido']
    },
    observation: {
        type: String,
        required: false,
        default: ''
    },
    weight: {
        type: Number,
        required: [true, 'El peso del paquete es requerido']
    },
    codeService: {
        type: String,
        required: [true, 'El código indentificador del servicio es requeido']
    },
    coordsOrigin: {
        latitude: { type: Number, required: [true, 'La latitud origen es requerida'] },
        longitude: { type: Number, required: [true, 'La longitud origen es requerida'] }
    },
    coordsFinish: {
        latitude: { type: Number, required: [true, 'La latitud destino es requerida'] },
        longitude: { type: Number, required: [true, 'La longitud destino es requerida'] }
    },
    acepted: {
        type: Boolean,
        default: false
    },
    quoted: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: new Date()
    },
    statusRegister: {
        type: Boolean,
        default: true
    }
});
exports.Service = mongoose_1.model('Service', ServiceSchema);
