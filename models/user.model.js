import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";


const userchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
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
    ref: 'Department',
    required: [true, 'Department is required']
  },
}, {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      }
    }
  });

  // Encrypt password before saving the user
userchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // Exit if password is not modified
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Proceed to save the hashed password
});
  
  
  const userModel = mongoose.model("User", userchema);

  export default userModel;