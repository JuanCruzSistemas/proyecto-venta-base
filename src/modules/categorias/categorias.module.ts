import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaEntity } from "./infraestructure/persistence/typeorm-persistence/entities/categoria.orm-entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoriaEntity])
    ]
})
export class CategoriasModule {}