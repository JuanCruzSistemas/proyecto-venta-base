import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ProductoEntity } from "../../../../../productos/infraestructure/persistence/typeorm-persistence/entities/producto.orm-entity";

@Entity('categorias')
export class CategoriaEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    nombre!: string;

    @CreateDateColumn({ name: 'creado_en' })
    creadoEn!: Date;

    @OneToMany(() => ProductoEntity, (producto) => producto.categoria)
    productos!: ProductoEntity[];
}