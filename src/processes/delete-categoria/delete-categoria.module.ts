import { Module } from "@nestjs/common";

import { CategoriasModule } from "../../modules/categorias/categorias.module";
import { CategoriasController } from "../../modules/categorias/infraestructure/presentation/controllers/categorias.controller";
import { DeleteCategoriaUseCase } from "./use-cases/delete-categoria.use-case";
import { DeleteCategoriaFacade } from "./facades/delete-categoria.facade";
import { ProductosModule } from "../../modules/productos/productos.module";

@Module({
    imports: [
        CategoriasModule,
        ProductosModule
    ],
    providers: [
        DeleteCategoriaUseCase,
        DeleteCategoriaFacade
    ],
    controllers: [
        CategoriasController
    ]
})
export class DeleteCategoriaModule {}