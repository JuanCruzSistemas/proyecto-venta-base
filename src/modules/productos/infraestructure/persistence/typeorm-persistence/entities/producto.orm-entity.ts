import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { DecimalColumn } from "../../../../../../common/decorators/decimal.decorator";

import { CategoriaEntity } from "../../../../../categorias/infraestructure/persistence/typeorm-persistence/entities/categoria.orm-entity";

import { DetalleVentaEntity } from "../../../../../ventas/infraestructure/persistence/typeorm-persistence/entities/detalle-venta.orm-entity";

@Entity('productos')
export class ProductoEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    nombre!: string;

    @DecimalColumn()
    precio!: number;

    @Column({ default: true })
    activo!: boolean;

    @CreateDateColumn({ name: 'creado_en' })
    creadoEn!: Date;

    @OneToMany(() => DetalleVentaEntity, (detalle) => detalle.producto)
    detallesVenta!: DetalleVentaEntity[];
    
    @Column({ name: 'categoria_id' })
    categoriaId!: number;

    @ManyToOne(() => CategoriaEntity, (categoria) => categoria.productos)
    @JoinColumn({ name: 'categoria_id' })
    categoria!: CategoriaEntity;
}