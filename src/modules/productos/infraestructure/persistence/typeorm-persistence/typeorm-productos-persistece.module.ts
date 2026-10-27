import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CategoriaEntity } from "../../../../categorias/infraestructure/persistence/typeorm-persistence/entities/categoria.orm-entity";

import { DetalleVentaEntity } from "../../../../ventas/infraestructure/persistence/typeorm-persistence/entities/detalle-venta.orm-entity";

import { PRODUCTOS_PERSISTENCE_PORT } from "../../../domain/ports/productos-persistence.port";
import { ProductoEntity } from "./entities/producto.orm-entity";
import { TypeOrmProductosRepository } from "./repositories/productos.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductoEntity,
            CategoriaEntity,
            DetalleVentaEntity
        ])
    ],
    providers: [
        {
            provide: PRODUCTOS_PERSISTENCE_PORT,
            useClass: TypeOrmProductosRepository
        }
    ],
    exports: [
        TypeOrmModule,
        PRODUCTOS_PERSISTENCE_PORT
    ]
})
export class TypeOrmProductosPersistenceModule {}