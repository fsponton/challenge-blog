import { Request, Response, NextFunction } from "express";

export const validatePostCreate = (req: Request, res: Response, next: NextFunction): void => {
    const { title, content } = req.body;
    //session traer creatorid
    const errors: string[] = [];

    // Validar el campo "title"
    if (!title || typeof title !== "string" || title.trim().length < 3) {
        errors.push("El título es obligatorio y debe tener al menos 3 caracteres.");
    }

    // Validar el campo "content"
    if (!content || typeof content !== "string" || content.trim().length < 10) {
        errors.push("El contenido es obligatorio y debe tener al menos 10 caracteres.");
    }



    // Si hay errores, responder con un código 400
    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    next();
};