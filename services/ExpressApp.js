import express from "express";
import  { routes } from "../routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser"
import documentation from '../docs/swagger.json' assert {"type":"json"}
import swaggerUi from 'swagger-ui-express'
import ErrorHandlerMiddleware from '../middlewares/ErrorHandler.js'

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

    app.use('/api', routes);
    app.use(cookieParser());
    app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(documentation))

    app.use(ErrorHandlerMiddleware);

   
    return app;
}