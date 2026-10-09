import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductoEntity } from "../../../../productos/infraestructure/persistence/typeorm-persistence/entities/producto.orm-entity";
import { VentaEntity } from "./entities/venta.orm-entity";
import { DetalleVentaEntity } from "./entities/detalle-venta.orm-entity";
import { VENTAS_REPOSITORY_TOKEN } from "../../../domain/repositories/ventas.repository.interface";
import { TypeOrmVentasRepository } from "./repositories/typeorm-ventas.repository";
import { TypeOrmUnitOfWorkModule } from "../../../../../common/infraestructure/typeorm-uow/typeorm-uow.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductoEntity,
            VentaEntity,
            DetalleVentaEntity
        ]),
        TypeOrmUnitOfWorkModule
    ],
    providers: [
        {
            provide: VENTAS_REPOSITORY_TOKEN,
            useClass: TypeOrmVentasRepository
        }
    ],
    exports: [
        TypeOrmModule,
        VENTAS_REPOSITORY_TOKEN
    ]
})
export class TypeOrmVentasPersistenceModule {}