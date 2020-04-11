import { Schema, model, Document } from 'mongoose';

let ServiceSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
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

interface ICoords extends Document {
    latitude: Number;
    longitude: Number;
}

export interface IService extends Document {
    client: string;
    codeService: string;
    observation: String;
    weight: number;
    coordsOrigin: ICoords;
    coordsFinish: ICoords;
    acepted: boolean;
    quoted: boolean;
    created: string;
    statusRegister: boolean;
}

export const Service = model<IService>('Service', ServiceSchema);