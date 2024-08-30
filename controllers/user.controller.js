import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
import asyncWrapper from "../middlewares/async.js";
import { BadRequestError } from "../errors/BadRequestError.js";
import { validationResult } from "express-validator";
import crypto from "crypto";

export const signUp = asyncWrapper(async (req, res, next) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg));
    }
  
    // Check if the email already exists
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return next(new BadRequestError("Email already in use!"));
    }
  
    // Create new user
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
  
    await newUser.save();
  
    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  });

  export const logIn = asyncWrapper(async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new BadRequestError(errors.array()[0].msg));
    }
  
    // Find user
    const foundUser = await userModel.findOne({ email: req.body.email });
    
  
    // Check account verification
    
  
    // Verify password
    const isPasswordVerfied = await bcryptjs.compareSync(
      req.body.password,
      foundUser.password
    );
    if (!isPasswordVerfied) {
      return next(new BadRequestError("Invalid email or password!"));
    }
  
    // Generate token
    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    
    res.status(200).json({
      message: "User logged in!",
      token: token,
      user: foundUser,
    });
  });
  
  
  export const logout = asyncWrapper(async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json("Logout Success");
  });
  