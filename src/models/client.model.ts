import { Schema, model, Document } from 'mongoose';

let enumRoles = {
    values: ['CLIENT_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let ClientSchema = new Schema({
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
        unique: true,
        trim: true,
        required: [true, 'El email es requerido'] 
    },
    phone: {
        type: String,
        trim: true,
        required: [true, 'El teléfono es requerido'] 
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
        userName: {type: String, required: [true, 'El usuario es requerido']},
        userPassword: {type: String, required: [true, 'La contraseña es requerida']},
        role: { type: String, enum: enumRoles  }
    },
    created: {
        type: Date,
        default: Date.now()
    },
    statusRegister: {
        type: Boolean,
        default: true
    }
});

interface IUser {
    userName: String;
    userPassword: String;
    role: String;
}

export interface ICoords {
    latitude: Number;
    longitude: Number;
}

export interface IClient extends Document {
    name: string;
    surname: string;
    nameComplete: string;
    email: string;
    phone: string;
    address: string;
    coords: ICoords;
    user: IUser;
    created?: string;
    statusRegister?: boolean;
}

export const Client = model<IClient>('Client', ClientSchema);