import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductoEntity } from "../../../../productos/infraestructure/persistence/typeorm-persistence/entities/producto.orm-entity";

import { CategoriaEntity } from "./entities/categoria.orm-entity";
import { CATEGORIAS_REPOSITORY } from "../../../domain/repositories/categorias.repository.interface";
import { CategoriasRepository } from "./repositories/categorias.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CategoriaEntity,
            ProductoEntity
        ])
    ],
    providers: [
        {
            provide: CATEGORIAS_REPOSITORY,
            useClass: CategoriasRepository
        }
    ],
    exports: [
        CATEGORIAS_REPOSITORY,
        TypeOrmModule
    ]
})
export class CategoriaPersistenceModule {}