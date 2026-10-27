import { Module } from "@nestjs/common";

import { CATEGORIAS_PERSISTENCE_PORT } from "../../../domain/ports/categorias-persistence.port";

import { CategoriasRepository } from "./repositories/categorias.repository";

@Module({
    providers: [
        {
            provide: CATEGORIAS_PERSISTENCE_PORT,
            useClass: CategoriasRepository
        }
    ],
    exports: [
        CATEGORIAS_PERSISTENCE_PORT
    ]
})
export class CategoriasPersistenceModule {}
