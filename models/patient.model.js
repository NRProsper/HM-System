import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    province: {
        type: String,
        required: true,
        trim: true,
    },
    district: {
        type: String,
        required: true,
        trim: true,
    },
    village: {
        type: String,
        required: true,
        trim: true,
    },
    cell: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

export default mongoose.model('Patient', PatientSchema);

