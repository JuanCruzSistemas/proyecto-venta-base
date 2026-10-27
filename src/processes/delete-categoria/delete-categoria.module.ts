import { Module } from "@nestjs/common";

import { CategoriasPersistenceModule } from "../../modules/categorias/infraestructure/persistence/prisma-persistence/categorias-persistence.module";
import { ProductosPersistenceModule } from "../../modules/productos/infraestructure/persistence/prisma-persistence/prisma-productos-persistence.module";

import { DeleteCategoriaUseCase } from "./use-cases/delete-categoria.use-case";
import { DeleteCategoriaFacade } from "./facades/delete-categoria.facade";
import { DELETE_CATEGORIA_PORT } from "./ports/delete-categoria.port";

@Module({
    imports: [
        CategoriasPersistenceModule,
        ProductosPersistenceModule
    ],
    providers: [
        DeleteCategoriaUseCase,
        DeleteCategoriaFacade,
        {
            provide: DELETE_CATEGORIA_PORT,
            useClass: DeleteCategoriaFacade
        }
    ],
    exports: [
        DELETE_CATEGORIA_PORT
    ]
})
export class DeleteCategoriaModule {}
