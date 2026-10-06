import { DetalleVentaResponse } from "./detalle-venta.response";

export interface VentaResponse {
    id: number;
    fecha: Date;
    total: number;
    detalles: DetalleVentaResponse[];
}
