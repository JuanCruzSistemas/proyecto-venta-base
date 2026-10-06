import { Producto } from "../entities/producto.entity";
import { Precio } from "../value-objects/precio.vo";
import { CreateProductoInput } from "../inputs/create-producto.interface";
import { ReconstituteProductoInput } from "../inputs/reconstitute-producto.interface";

export class ProductosFactory {
    public static create(data: CreateProductoInput): Producto {
        const precioVO = Precio.create(data.precio);
        return new Producto(
            null,
            data.nombre,
            precioVO,
            data.categoriaId
        );
    }

    public static reconstitute(data: ReconstituteProductoInput): Producto {
        const precioVO = Precio.create(data.precio);
        return new Producto(
            data.id,
            data.nombre,
            precioVO,
            data.categoriaId,
            data.activo,
            data.creadoEn
        );
    }
}