import { Module } from "@nestjs/common";

import { CreateCategoriaUseCase, FindAllCategoriasUseCase, FindOneCategoriaUseCase, UpdateCategoriaUseCase } from "./application/use-cases";
import { CategoriasFacade } from "./application/facades/categorias.facade";
import { CategoriasPersistenceModule } from "./infraestructure/persistence/prisma-persistence/categorias-persistence.module";
import { CategoriasController } from "./infraestructure/presentation/controllers/categorias.controller";
import { DeleteCategoriaModule } from "../../processes/delete-categoria/delete-categoria.module";
import { CATEGORIAS_APPLICATION_PORT } from "./application/ports/categorias-application.port";
import { CategoriaExistenceValidator } from "./application/services/categoria-existence.validator";
import { CategoriasFinder } from "./application/services/categorias.finder";
// import { TypeOrmCategoriasPersistenceModule } from "./infraestructure/persistence/typeorm-persistence/categoria-persistence.module";

@Module({
    imports: [
        // TypeOrmCategoriasPersistenceModule,
        CategoriasPersistenceModule,
        DeleteCategoriaModule
    ],
    providers: [
        CategoriaExistenceValidator,
        CategoriasFinder,
        CreateCategoriaUseCase,
        FindOneCategoriaUseCase,
        FindAllCategoriasUseCase,
        UpdateCategoriaUseCase,
        CategoriasFacade,
        {
            provide: CATEGORIAS_APPLICATION_PORT,
            useClass: CategoriasFacade
        }
    ],
    controllers: [
        CategoriasController
    ],
    exports: [
        CategoriasPersistenceModule,
        CATEGORIAS_APPLICATION_PORT
    ]
})
export class CategoriasModule {}
