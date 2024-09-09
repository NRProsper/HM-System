import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    department: {
        type: mongoose.Schema.ObjectId,
        ref: 'Department',
        required: true
    },
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
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

appointmentSchema.statics.approveAppointment = async function (appointmentId) {
    const appointment = await this.findById(appointmentId);
    if (!appointment) {
        throw new Error('Appointment not found');
    }

    if (appointment.status !== 'PENDING') {
        throw new Error('Appointment cannot be approved because it is not in PENDING status');
    }

    appointment.status = 'ACCEPTED';
    return appointment.save();
}


export default mongoose.model("Appointment", appointmentSchema);

