import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

interface DecodedUser {
    id: number;
    name: string;
    email: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: DecodedUser;
        }
    }
}


export const validateToken = (req: Request, res: Response, next: NextFunction): void => {

    const token = req?.headers["authorization"];


    if (!token) {
        res.status(401).json({ error: "El token es obligatorio." });
        return;
    }

    jwt.verify(token, process.env.PW_TOKEN as string, (err, decoded) => {

        if (err || !decoded) {
            return res.status(403).json({ error: "Token no válido o expirado." });
        }

        req.body.operatorId = (decoded as DecodedUser).id;

        next();
    });
};

