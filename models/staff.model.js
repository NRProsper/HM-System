import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email must be provided"],
        unique: true
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "Phone number must be provided"]
    },
    description: String,
    role:{
        type: String,
        enum: {
            values: ['Admin', 'Doctor', 'Nurse', 'Receptionist'],
            message: '${VALUE} is not supported'
        },
        default: 'Doctor'
    },
    department: {
        type: mongoose.Schema.ObjectId,
        ref: 'department',
        required: [true, 'Department is required']
    },
    availability: [             // this is nullable, it applies to doctors only
        {
            type: Date
        }
    ]
})

const staffModel=mongoose.model("staff", staffSchema);

export default staffModel;
