import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { infoError } from "../infoError";

export class AuthController {
    static async register(req: Request, res: Response): Promise<Response> {

        const { email, password, name } = req.body;
        const [user, err] = await AuthService.register(email, password, name);

        if (err !== 0) {
            console.log("Error en controller register", err)
            const message = infoError[err] || "Error desconocido";
            return res.status(err).json({ message });
        }

        return res.status(200).json({ data: user, message: 'Usuario creado' })
    }

    static async signin(req: Request, res: Response): Promise<Response> {

        const { email, password } = req.body;
        const [token, err] = await AuthService.login(email, password);

        if (err !== 0) {
            const message = infoError[err] || "Error desconocido"
            return res.status(err).json({ message });
        }

        return res.status(200).json({ token })
    }
}