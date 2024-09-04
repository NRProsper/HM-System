import express from "express";
import { createContactMessages, listContactMessages, deleteMessage } from "../controllers/contact-us.controller.js";
import { contactValidationRules } from '../utils/validation.js';

const  contactRoute = express.Router();


contactRoute.post("/contact-us",contactValidationRules, createContactMessages);


contactRoute.get("/listMessage", listContactMessages);


contactRoute.delete("/delete/:id", deleteMessage);

export default contactRoute;