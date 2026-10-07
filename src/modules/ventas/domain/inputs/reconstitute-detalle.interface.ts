import { Producto } from "../../../productos/domain/entities/producto.entity";

export interface ReconstituteDetalleVentaInput {
    id: number;
    productoId: number;
    producto: Producto;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}
