import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductoEntity } from "../../../../productos/infraestructure/persistence/typeorm-persistence/entities/producto.orm-entity";

import { CategoriaEntity } from "./entities/categoria.orm-entity";
import { CATEGORIAS_PERSISTENCE_PORT } from "../../../domain/ports/categorias-persistence.port";
import { TypeOrmCategoriasRepository } from "./repositories/typeorm-categorias.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CategoriaEntity,
            ProductoEntity
        ])
    ],
    providers: [
        {
            provide: CATEGORIAS_PERSISTENCE_PORT,
            useClass: TypeOrmCategoriasRepository
        }
    ],
    exports: [
        CATEGORIAS_PERSISTENCE_PORT,
        TypeOrmModule
    ]
})
export class TypeOrmCategoriasPersistenceModule {}