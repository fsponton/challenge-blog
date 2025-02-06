import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({ length: 100 })
    name: string = "";

    @Column({ unique: true })
    email: string = "";

    @Column()
    password: string = "";

    @CreateDateColumn()
    created_at: Date = new Date();

    @OneToMany(() => Post, (post) => post.creator, { cascade: true })
    posts?: Post[];;
}