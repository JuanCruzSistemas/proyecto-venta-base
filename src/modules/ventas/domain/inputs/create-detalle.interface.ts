import { Producto } from "../../../productos/domain/entities/producto.entity";

export interface CreateDetalleInput {
    producto: Producto;
    cantidad: number;
}
