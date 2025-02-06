import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({ type: "varchar", length: 255 })
    title: string = "";

    @Column({ type: "text" })
    content: string = "";

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date = new Date();

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date = new Date();

    @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
    creator?: User;
}
