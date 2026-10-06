import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { DecimalColumn } from "../../../../../../common/decorators/decimal.decorator";

import { DetalleVentaEntity } from "./detalle-venta.orm-entity";

@Entity('ventas')
export class VentaEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    fecha!: Date;

    @DecimalColumn()
    total!: number;

    @OneToMany(() => DetalleVentaEntity, (detalle) => detalle.venta)
    detallesVenta!: DetalleVentaEntity[];
}