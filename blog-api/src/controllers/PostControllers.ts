import { Request, Response } from "express";
import { PostService } from "../services/PostServices";
import { infoError } from "../infoError";

export class PostController {
    static async create(req: Request, res: Response): Promise<Response> {
        const { title, content, operatorId } = req.body

        const [newPost, err] = await PostService.create({ title, content, creatorId: operatorId });

        if (err !== 0) {
            console.log('Error en controller, create =>', err)
            const message = infoError[err] || "Error desconocido";
            return res.status(err).json({ error: message });
        }


        const post = {
            ...newPost,
            creator: {
                id: newPost?.creator!.id,
                name: newPost?.creator!.name,
                email: newPost?.creator!.email,
            },
        };

        return res.status(201).json({ data: post, message: "Posteo creado" });
    }


    static async edit(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { postData, operatorId } = req.body;

        if (!operatorId) {
            return res.status(401).json({ message: "Usuario no autorizado" });
        }

        const [updatedPost, err] = await PostService.edit({ postId: parseInt(id), postData, operatorId });

        if (err !== 0) {
            console.log('Error en controller, edit =>', err)
            const message = infoError[err] || "Error desconocido";
            return res.status(err).json({ message });
        }

        return res.status(200).json({ data: updatedPost, message: "Posteo editado" });
    }


    static async getAll(_req: Request, res: Response): Promise<Response> {
        const [posts, err] = await PostService.getAll();

        if (err !== 0) {
            console.log('Error en controller, getAll =>', err)
            const message = infoError[err] || "Error desconocido";
            return res.status(err).json({ message });
        }

        const allPosts = posts?.map(post => ({
            ...post,
            creator: {
                id: post.creator?.id,
                name: post.creator?.name,
                email: post.creator?.email,
            }
        }));

        return res.status(200).json({ data: allPosts, message: "Todos los posteos" });
    }


    static async deleteById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { operatorId } = req.body;

        const [_result, err] = await PostService.deleteById(parseInt(id), operatorId);

        if (err !== 0) {
            console.log('Error en controller, deleteById =>', err)
            const message = infoError[err] || "Error desconocido";
            return res.status(err).json({ message });
        }

        return res.status(200).json({ data: {}, message: `Se ha borrado el post con id ${id}` });
    }
}