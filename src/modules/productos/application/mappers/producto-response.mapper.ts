import { Producto } from "../../domain/entities/producto.entity";

import { ProductoResponse } from "../responses/producto.response";

export class ProductoResponseMapper {
    static toResponse(domain: Producto): ProductoResponse {
        return {
            id: domain.getId()!,
            nombre: domain.getNombre(),
            precio: domain.getPrecio(),
            activo: domain.estaActivo(),
            categoriaId: domain.getCategoriaId(),
            creadoEn: domain.getCreadoEn()
        };
    }
}
