import { Request, Response, NextFunction } from "express";

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
    const { name, email, password } = req.body;
    const errors: string[] = [];

    if (!name || typeof name !== "string" || name.trim().length < 3) {
        errors.push("El nombre es obligatorio y debe tener al menos 3 caracteres.");
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
        errors.push("El correo es obligatorio y debe ser válido.");
    }

    if (!password || typeof password !== "string" || password.length < 6) {
        errors.push("La contraseña es obligatoria y debe tener al menos 6 caracteres.");
    }


    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    next();
};