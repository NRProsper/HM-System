import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
import asyncWrapper from "../middlewares/async.js";
import { BadRequestError } from "../errors/BadRequestError.js";
import { validationResult } from "express-validator";
import crypto from "crypto";
import UserModel from "../models/user.model.js";

export const createUser = asyncWrapper(async (req, res, next) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg));
    }

    const { firstName, lastName, email, phone, description, password, role, departmentId } = req.body;
  
    // Check if the email already exists
    const existingUser = await userModel.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
        return next(new BadRequestError("Email or phone number already in use!"));
    }
  
    // Create new user
    const newUser = new UserModel({
        firstName,
        lastName,
        email,
        phone,
        description,
        password,
        role,
        departmentId,
    });
  
    await newUser.save();

    res.status(201).json({
        message: "User registered successfully!",
        user: {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phone: newUser.phone,
            description: newUser.description,
            departmentId: newUser.departmentId
        },
    });

  });

  export const logIn = asyncWrapper(async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg));
    }

    const { email, password } = req.body;
  
    // Find user
      const foundUser = await UserModel.findOne({ email }).populate('departmentId');
      if (!foundUser) {
          return next(new BadRequestError("Invalid email or password!"));
      }
  
    // Verify password
      const isPasswordVerified = await bcryptjs.compare(password, foundUser.password);
      if (!isPasswordVerified) {
          return next(new BadRequestError("Invalid email or password!"));
      }
  
    // Generate token
      const token = jwt.sign(
          {
              id: foundUser.id,
              email: foundUser.email,
              role: foundUser.role,
              firstName: foundUser.firstName,
              lastName: foundUser.lastName,
              phone: foundUser.phone,
              departmentId: foundUser.departmentId ? foundUser.departmentId._id : null,
              departmentName: foundUser.departmentId ? foundUser.departmentId.name : null
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
      );

      res.status(200).json({
          message: "User logged in!",
          token: token,
          user: {
              id: foundUser.id,
              email: foundUser.email,
              role: foundUser.role,
              firstName: foundUser.firstName,
              lastName: foundUser.lastName,
              phone: foundUser.phone,
              departmentId: foundUser.departmentId ? foundUser.departmentId._id : null,
              departmentName: foundUser.departmentId ? foundUser.departmentId.name : null
          }
      });
  });
  
  
  export const logout = asyncWrapper(async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json("Logout Success");
  });
  