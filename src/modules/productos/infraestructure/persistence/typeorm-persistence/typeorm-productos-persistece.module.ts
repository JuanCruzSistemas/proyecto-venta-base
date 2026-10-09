import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CategoriaEntity } from "../../../../categorias/infraestructure/persistence/typeorm-persistence/entities/categoria.orm-entity";

import { DetalleVentaEntity } from "../../../../ventas/infraestructure/persistence/typeorm-persistence/entities/detalle-venta.orm-entity";

import { PRODUCTOS_REPOSITORY_TOKEN } from "../../../domain/repositories/productos.repository.interface";
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
            provide: PRODUCTOS_REPOSITORY_TOKEN,
            useClass: TypeOrmProductosRepository
        }
    ],
    exports: [
        TypeOrmModule,
        PRODUCTOS_REPOSITORY_TOKEN
    ]
})
export class TypeOrmProductosPersistenceModule {}