import { Module } from "@nestjs/common";
import { CATEGORIAS_REPOSITORY_TOKEN } from "../../../domain/repositories/categorias.repository.interface";
import { PrismaCategoriasRepository } from "./repositories/prisma-categorias.repository";

@Module({
    providers: [
        {
            provide: CATEGORIAS_REPOSITORY_TOKEN,
            useClass: PrismaCategoriasRepository
        }
    ],
    exports: [
        CATEGORIAS_REPOSITORY_TOKEN
    ]
})
export class PrismaCategoriasPersistenceModule {}
