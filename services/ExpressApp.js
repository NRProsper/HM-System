import express from "express";
import routes  from "../routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser"
import documentation from '../docs/swagger.json' assert {"type":"json"}
import swaggerUi from 'swagger-ui-express'
import ErrorHandlerMiddleware from '../middlewares/ErrorHandler.js'

import configurations from "../configs/index.js";





export default function (app) {
    app.use(cors());
    app.use(express.json());

    app.get("/", (req, res) => {
        res.send("Welcome to health management API v.1.0.0");
    })

    app.use('/api', routes);
    app.use(cookieParser());
    app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(documentation))

    // app.use(ErrorHandlerMiddleware);

   
    return app;
}