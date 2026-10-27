import { Module } from "@nestjs/common";

import { ProductosPersistenceModule } from "../../modules/productos/infraestructure/persistence/prisma-persistence/prisma-productos-persistence.module";
import { CategoriasPersistenceModule } from "../../modules/categorias/infraestructure/persistence/prisma-persistence/categorias-persistence.module";

import { CreateProductoUseCase } from "./use-cases/create-producto.use-case";
import { ManageProductoFacade } from "./facades/manage-producto.facade";
import { UpdateProductoUseCase } from "./use-cases/update-producto.use-case";
import { MANAGE_PRODUCTO_PORT } from "./ports/manage-producto.port";

@Module({
    imports: [
        ProductosPersistenceModule,
        CategoriasPersistenceModule
    ],
    providers: [
        CreateProductoUseCase,
        UpdateProductoUseCase,
        ManageProductoFacade,
        {
            provide: MANAGE_PRODUCTO_PORT,
            useClass: ManageProductoFacade
        }
    ],
    exports: [
        ManageProductoFacade,
        MANAGE_PRODUCTO_PORT
    ]
})
export class ManageProductoModule {}
