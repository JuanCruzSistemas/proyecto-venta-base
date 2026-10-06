import { Module } from "@nestjs/common";
import { CategoriasModule } from "../../modules/categorias/categorias.module";
import { CategoriasController } from "../../modules/categorias/infraestructure/presentation/controllers/categorias.controller";
import { DeleteCategoriaUseCase } from "./use-cases/delete-categoria.use-case";

@Module({
    imports: [
        CategoriasModule,
        
    ],
    providers: [
        DeleteCategoriaUseCase
    ],
    controllers: [
        CategoriasController
    ]
})
export class DeleteCategoriaModule {}