import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';

import configurations from "../configs/index.js";


// Cors policy configuration.
const corsOptions = {
    allowedHeaders: ["Authorization","Content-Type"],
    methods: ["GET", "POST", "UPDATE" ],
    origin: ["http://localhost:5500", configurations.CLIENT_APP],
}

export default function (app) {
    app.use(cors());
    app.use(express.json());

   
    return app;
}