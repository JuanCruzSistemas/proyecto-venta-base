import { ManyToOne } from "typeorm";
import { CategoriaEntity } from "../../../../../categorias/infraestructure/persistence/typeorm-persistence/entities/categoria.orm-entity";

export class ProductoEntity {
    @ManyToOne(() => CategoriaEntity, (categoria) => categoria.productos)
    categoria!: CategoriaEntity;
}