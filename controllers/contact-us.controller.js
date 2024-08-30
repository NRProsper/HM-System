import asyncWrapper from "../middlewares/async.js";
import contactModel from "../models/contact-us.model.js";
import {BadRequestError} from "../errors/BadRequestError.js";
import {NotFoundError} from "../errors/NotFoundError.js";



// Create a new Contact Us message
export const createContactMessages = asyncWrapper(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return next(new BadRequestError("All fields are required!"));
  }

  const contactUs = await contactModel.create({ name, email, subject, message });

  res.status(201).json({
    message: "Contact message created successfully",
    data: contactUs,
  });
});

export const listContactMessages = async (req, res) => {
    try {
      const contactMessages = await contactModel.find();
      res.status(200).json(contactMessages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const deleteMessage = asyncWrapper(async (req, res, next) => {
    const msge = await contactModel.findByIdAndDelete(req.params.id);
    if (!msge) {
      return res.status(404).json({ message: "Message not found" });
    }
    return res.status(200).json({
      message: "Message deleted successfully",
      msge
    });
  });
  
