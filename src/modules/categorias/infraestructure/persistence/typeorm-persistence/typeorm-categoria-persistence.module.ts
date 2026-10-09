import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductoEntity } from "../../../../productos/infraestructure/persistence/typeorm-persistence/entities/producto.orm-entity";

import { CategoriaEntity } from "./entities/categoria.orm-entity";
import { CATEGORIAS_REPOSITORY_TOKEN } from "../../../domain/repositories/categorias.repository.interface";
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
            provide: CATEGORIAS_REPOSITORY_TOKEN,
            useClass: TypeOrmCategoriasRepository
        }
    ],
    exports: [
        CATEGORIAS_REPOSITORY_TOKEN,
        TypeOrmModule
    ]
})
export class TypeOrmCategoriasPersistenceModule {}