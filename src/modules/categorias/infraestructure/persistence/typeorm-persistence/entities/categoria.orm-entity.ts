import { Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ProductoEntity } from "../../../../../productos/infraestructure/persistence/typeorm-persistence/entities/producto.orm-entity";

export class CategoriaEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    nombre!: string;

    @CreateDateColumn()
    creadoEn!: Date;

    @OneToMany(() => ProductoEntity, (producto) => producto.categoria)
    productos!: ProductoEntity[];
}