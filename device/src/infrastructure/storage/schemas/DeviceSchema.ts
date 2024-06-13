import { Schema } from 'mongoose';

export const deviceSchema = new Schema({
    deviceId: String,
    locationId: String,
    description: String,
    endpoint: {
        ipAddress: String,
        port: Number
    },
    external: Boolean,
});