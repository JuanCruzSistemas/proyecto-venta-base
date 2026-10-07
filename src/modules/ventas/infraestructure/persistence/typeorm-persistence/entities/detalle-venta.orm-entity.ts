import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { DecimalColumn } from "../../../../../../common/decorators/decimal.decorator";

import { ProductoEntity } from "../../../../../productos/infraestructure/persistence/typeorm-persistence/entities/producto.orm-entity";

import { VentaEntity } from "./venta.orm-entity";

@Entity('detalles')
export class DetalleVentaEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => VentaEntity, (venta) => venta.detallesVenta)
    @JoinColumn({ name: 'venta_id' })
    venta!: VentaEntity;

    @ManyToOne(() => ProductoEntity, (producto) => producto.detallesVenta)
    @JoinColumn({ name: 'producto_id' })
    producto!: ProductoEntity;

    @Column()
    cantidad!: number;

    @DecimalColumn()
    precioUnitario!: number;

    @DecimalColumn()
    subtotal!: number;
}