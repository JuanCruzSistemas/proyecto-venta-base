import { Module } from "@nestjs/common";

import { CreateCategoriaUseCase, FindAllCategoriasUseCase, FindOneCategoriaUseCase, UpdateCategoriaUseCase } from "./application/use-cases";
import { CategoriasFacade } from "./application/facades/categorias.facade";
import { PrismaCategoriasPersistenceModule } from "./infraestructure/persistence/prisma-persistence/prisma-categorias-persistence.module";
// import { TypeOrmCategoriasPersistenceModule } from "./infraestructure/persistence/typeorm-persistence/categoria-persistence.module";

@Module({
    imports: [
        // TypeOrmCategoriasPersistenceModule,
        PrismaCategoriasPersistenceModule
    ],
    providers: [
        CreateCategoriaUseCase,
        FindOneCategoriaUseCase,
        FindAllCategoriasUseCase,
        UpdateCategoriaUseCase,
        CategoriasFacade
    ],
    exports: [
        CategoriasFacade,
        PrismaCategoriasPersistenceModule
    ]
})
export class CategoriasModule {}
