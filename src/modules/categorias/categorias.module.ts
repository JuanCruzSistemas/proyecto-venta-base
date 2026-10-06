import { Module } from "@nestjs/common";

import { CategoriaPersistenceModule } from "./infraestructure/persistence/typeorm-persistence/categoria-persistence.module";
import { CreateCategoriaUseCase, FindAllCategoriasUseCase, FindOneCategoriaUseCase, UpdateCategoriaUseCase } from "./application/use-cases";
import { CategoriasFacade } from "./application/facades/categorias.facade";

@Module({
    imports: [
        CategoriaPersistenceModule
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
        CategoriaPersistenceModule
    ]
})
export class CategoriasModule {}