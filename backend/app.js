import express from "express";
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from './router/messageRouter.js';
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import authRouter from './router/authRouter.js'
import appointmentRouter from './router/appointmentRouter.js'

const app = express();
config({ path: "./config/config.env" });



app.use(cors({
    origin: [process.env.FRONTEND_URI, process.env.DASHBOARD_URI],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));
dbConnection()

app.use('/api/user/message', messageRouter);
app.use('/api/user',authRouter)
app.use('/api/user/appointment',appointmentRouter)
dbConnection();

app.use(errorMiddleware)

export default app;
