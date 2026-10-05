import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class CategoriaEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    nombre!: string;

    @CreateDateColumn()
    creadoEn!: Date;
}