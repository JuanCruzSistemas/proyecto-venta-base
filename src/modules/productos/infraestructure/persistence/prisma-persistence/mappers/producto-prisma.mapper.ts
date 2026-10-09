import { Prisma, Producto as ProductoPrisma } from "../../../../../../generated/prisma";

import { Producto } from "../../../../domain/entities/producto.entity";
import { ProductosFactory } from "../../../../domain/factories/productos.factory";

export class ProductoPrismaMapper {
    static toCreateInput(domain: Producto): Prisma.ProductoUncheckedCreateInput {
        return {
            nombre: domain.getNombre(),
            precio: domain.getPrecio(),
            activo: domain.estaActivo(),
            categoriaId: domain.getCategoriaId(),
            creadoEn: domain.getCreadoEn(),
        };
    }
    
    static toUpdateInput(domain: Producto): Prisma.ProductoUncheckedUpdateInput {
        return {
            nombre: domain.getNombre(),
            precio: domain.getPrecio(),
            activo: domain.estaActivo(),
            categoriaId: domain.getCategoriaId(),
            creadoEn: domain.getCreadoEn()
        };
    }

    static toDomain(prisma: ProductoPrisma): Producto {
        return ProductosFactory.reconstitute({
            id: prisma.id,
            nombre: prisma.nombre,
            precio: Number(prisma.precio),
            categoriaId: prisma.categoriaId,
            activo: prisma.activo,
            creadoEn: prisma.creadoEn
        });
    }
}
