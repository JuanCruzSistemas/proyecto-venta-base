import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductoEntity } from "../../../../productos/infraestructure/persistence/typeorm-persistence/entities/producto.orm-entity";
import { VentaEntity } from "./entities/venta.orm-entity";
import { DetalleVentaEntity } from "./entities/detalle-venta.orm-entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductoEntity,
            VentaEntity,
            DetalleVentaEntity
        ])
    ],
    exports: [
        TypeOrmModule
    ]
})
export class VentasPersistenceModule {}