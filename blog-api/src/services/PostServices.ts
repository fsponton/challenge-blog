import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { AppDataSource } from "../config/database";

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);


interface CreatePostRequest {
    title: string;
    content: string;
    creatorId: number;
}

interface PostEditData {
    title?: string;
    content?: string;
}


export class PostService {
    static async getAll(): Promise<[Post[] | null, number]> {
        try {
            const posts = await postRepository.find({ relations: ["creator"] });
            return [posts, 0];
        } catch (err) {
            console.error(err);
            return [null, 500];
        }
    }

    static async getById(id: number): Promise<[Post | null, number]> {
        try {
            const post = await postRepository.findOne({ where: { id }, relations: ["creator"] });
            if (!post) {
                return [null, 404]; // Not Found
            }
            return [post, 0];
        } catch (err) {
            console.error(err);
            return [null, 500];
        }
    }

    static async create({
        title,
        content,
        creatorId
    }: CreatePostRequest): Promise<[Post | null, number]> {
        try {
            const creator = await userRepository.findOneBy({ id: creatorId });
            if (!creator) {
                return [null, 404];
            }

            const newPost = postRepository.create({ title, content, creator });
            const savedPost = await postRepository.save(newPost);

            return [savedPost, 0];
        } catch (err) {
            console.error(err);
            return [null, 500];
        }
    }

    static async deleteById(
        id: number,
        operatorId: number
    ): Promise<[Post | null, number]> {
        try {
            const post = await postRepository.findOne({ where: { id }, relations: ["creator"] });
            if (!post) {
                return [null, 404];
            }

            if (post.creator?.id !== operatorId) {
                return [null, 403];
            }

            const result = await postRepository.remove(post);
            return [result, 0];
        } catch (err) {
            console.error(err);
            return [null, 500];
        }
    }

    static async edit({
        postId,
        postData,
        operatorId
    }: { postId: number, postData: PostEditData; operatorId: number }): Promise<[Post | null, number]> {
        try {
            const post = await postRepository.findOne({
                where: { id: postId },
                relations: ["creator"]
            });


            if (!post) {
                return [null, 404];
            }


            if (post.creator?.id !== operatorId) {
                return [null, 403];
            }

            const { title, content } = postData;


            if (title) post.title = title;
            if (content) post.content = content;

            post.updatedAt = new Date();
            const updatedPost = await postRepository.save(post);

            return [updatedPost, 0];
        } catch (err) {
            console.error(err);
            return [null, 500];
        }
    }
}