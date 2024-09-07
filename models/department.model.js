import mongoose from "mongoose";

// Schema for the departments available in the clinic
const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
        
    },
    email: {
        type: String,
        required: true
        
    },
    location: {
        type: String,
        required: true
    },
    largeDescription: {
        type: String
    },
    services: {
        type: [String],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

const departmentModel=mongoose.model("Department", departmentSchema);


export default departmentModel;
