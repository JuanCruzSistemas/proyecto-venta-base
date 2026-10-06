import { Producto } from "../../../../domain/entities/producto.entity";
import { ProductosFactory } from "../../../../domain/factories/productos.factory";

import { ProductoEntity } from "../entities/producto.orm-entity";

export class ProductoOrmMapper {
    static toOrm(domain: Producto): ProductoEntity {
        const orm = new ProductoEntity();

        const id = domain.getId();
        if (id) {
            orm.id = id;
        }

        orm.nombre = domain.getNombre();
        orm.precio = domain.getPrecio();
        orm.activo = domain.estaActivo();
        orm.creadoEn = domain.getCreadoEn();
        orm.categoriaId = domain.getCategoriaId();

        return orm;
    }

    static toDomain(orm: ProductoEntity): Producto {
        return ProductosFactory.reconstitute({
            id: orm.id,
            nombre: orm.nombre,
            precio: orm.precio,
            activo: orm.activo,
            creadoEn: orm.creadoEn,
            categoriaId: orm.categoriaId
        });
    }
}