import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    departmentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Department',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Staff',
        required: true
    },
    visitDate: {
        type: Date,
        required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["PENDING", "REJECTED", "ACCEPTED"]
        },
        default: "PENDING"
    },
    time: {
        type: String,
        required: true
    },
    comments: String
})


export default mongoose.model("Appointment", appointmentSchema);

