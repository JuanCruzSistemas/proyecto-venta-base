import { Module } from "@nestjs/common";

import { CategoriasModule } from "../../modules/categorias/categorias.module";
import { CategoriasController } from "../../modules/categorias/infraestructure/presentation/controllers/categorias.controller";
import { DeleteCategoriaUseCase } from "./use-cases/delete-categoria.use-case";
import { DeleteCategoriaFacade } from "./facades/delete-categoria.facade";

@Module({
    imports: [
        CategoriasModule,
        
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