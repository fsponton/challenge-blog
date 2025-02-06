import { User } from "../entities/User";
import { AppDataSource } from "../config/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

const userRepository = AppDataSource.getRepository(User);

export class AuthService {

    static async register(email: string, password: string, name: string): Promise<[User | null, number]> {
        try {
            const existingUser = await userRepository.findOneBy({ email });

            if (existingUser) {
                return [null, 409];
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = userRepository.create({ name, email, password: hashedPassword });
            const savedUser = await userRepository.save(newUser);

            return [savedUser, 0];
        } catch (err) {
            console.error(err);
            return [null, 500];
        }
    }

    static async login(email: string, password: string): Promise<[string | null, number]> {
        try {
            const user = await userRepository.findOneBy({ email });
            if (!user) {
                return [null, 401];
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return [null, 401]; // Credenciales inválidas
            }

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.PW_TOKEN as string, { expiresIn: "1h" });
            return [token, 0];
        } catch (err) {
            console.error(err);
            return [null, 500];
        }
    }
}