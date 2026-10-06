import { Module } from "@nestjs/common";

import { ProductosModule } from "../../modules/productos/productos.module";
import { ProductosController } from "../../modules/productos/infraestructure/presentation/controllers/productos.controller";

import { CategoriasModule } from "../../modules/categorias/categorias.module";

import { CreateProductoUseCase } from "./use-cases/create-producto.use-case";
import { ManageProductoFacade } from "./facades/manage-producto.facade";
import { UpdateProductoUseCase } from "./use-cases/update-producto.use-case";

@Module({
    imports: [
        ProductosModule,
        CategoriasModule
    ],
    providers: [
        CreateProductoUseCase,
        UpdateProductoUseCase,
        ManageProductoFacade
    ],
    controllers: [
        ProductosController
    ]
})
export class ManageProductoModule {}