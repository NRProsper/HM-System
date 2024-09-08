import userModel from "../models/user.model.js";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import asyncWrapper from "../middlewares/async.js";
import {BadRequestError} from "../errors/BadRequestError.js";
import bcrypt from "bcryptjs";
import {validateLogin, validateUser} from "../utils/validation.js";
import {validateRequest} from "../middlewares/validate.js";

export const createUser = [
    validateUser,
    validateRequest,
    asyncWrapper(async (req, res, next) => {

        const { firstName, lastName, email, phone, description, password, role, department } = req.body;

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
            department,
        });

        await newUser.save();

        const htmlContent = `
        <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                    <td style="padding: 20px;">
                        <h1 style="font-size: 24px; color: #333333; margin-top: 0;">Dear ${newUser.firstName},</h1>
                        <p style="font-size: 16px; color: #666666;">Your account has been created successfully. Here are your credentials:</p>
                        <table width="100%" border="0" cellspacing="0" cellpadding="10" style="background-color: #f9f9f9; border-radius: 4px; margin-bottom: 20px;">
                            <tr>
                                <td style="font-size: 16px; color: #333333; font-weight: bold;">Email:</td>
                                <td style="font-size: 16px; color: #333333;">${newUser.email}</td>
                            </tr>
                            <tr>
                                <td style="font-size: 16px; color: #333333; font-weight: bold;">Password:</td>
                                <td style="font-size: 16px; color: #333333;">${password}</td>
                            </tr>
                        </table>
                        <p style="font-size: 16px; color: #666666;">Please change your password after logging in.</p>
                        <p style="font-size: 16px; color: #666666; margin-bottom: 0;">Best regards,<br>Care Sync</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;

        // sendEmail(newUser.role, "Your Account is created", htmlContent);

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

    })
];

  export const logIn = [
      validateLogin,
      validateRequest,
      asyncWrapper(async (req, res, next) => {

          const { email, password } = req.body;

          // Find user
          const foundUser = await UserModel.findOne({ email }).populate('departmentId');
          if (!foundUser) {
              return next(new BadRequestError("User not found!"));
          }

          // Verify password
          const isPasswordVerified = await bcrypt.compare(password, foundUser.password);
          if (!isPasswordVerified) {
              return res.status(400).json({
                  success: false,
                  message: "Invalid email or password!",
                  error: "Password verification failed",
              });
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
      })
  ];
  
  
  export const logout = asyncWrapper(async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json("Logout Success");
  });
  