import { Categoria } from "../../../../domain/entities/categoria.entity";
import { CategoriaEntity } from "../entities/categoria.orm-entity";

export class CategoriaOrmMappers {
    static toOrm(domain: Categoria): CategoriaEntity {
        const orm = new CategoriaEntity();
        const id = domain.getId();
        
        if (id) {
            orm.id = id;
        }
        orm.nombre = domain.getNombre();
        orm.creadoEn = domain.getCreadoEn();

        return orm;
    }

    static toDomain(orm: CategoriaEntity): Categoria {
        return Categoria.reconstitute({
            id: orm.id,
            nombre: orm.nombre,
            creadoEn: orm.creadoEn
        });
    }
}