import { DetalleVenta } from "../entities/detalle-venta.entity";

export interface ReconstituteVentaInput {
    id: number;
    total: number;
    fecha: Date;
    detalles: DetalleVenta[];
}
