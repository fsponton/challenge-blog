import "reflect-metadata";
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./config/database";
import AuthRoutes from "../src/routes/AuthRoutes";
import PostRoutes from "../src/routes/PostRoutes";
import asyncHandler from "./middlewares/asyncHandler";
import cors from "cors"
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({ origin: process.env.SERVER_URL_CORS }));
app.use("/auth", asyncHandler(AuthRoutes));
app.use("/posts", asyncHandler(PostRoutes))

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal. Intenta nuevamente.' });
});


AppDataSource.initialize()
    .then(() => {
        console.log("📦 Base de datos conectada!");
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`🚀 Servidor corriendo en  ${process.env.SERVER_HOST}:${process.env.SERVER_PORT} `);
        });
    })
    .catch((err) => {
        console.error("Error en conectar base de datos", err);
    });