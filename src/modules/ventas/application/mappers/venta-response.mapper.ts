import { DetalleVenta } from "../../domain/entities/detalle-venta.entity";
import { Venta } from "../../domain/entities/venta.entity";
import { DetalleVentaResponse } from "../responses/detalle-venta.response";
import { VentaResponse } from "../responses/venta.response";

export class VentaResponseMapper {
    public static toResponse(venta: Venta): VentaResponse {
        return {
            id: venta.getId()!,
            fecha: venta.getFecha(),
            total: venta.getTotal(),
            detalles: venta.getDetalles().map(this.detalleToResponse)
        };
    }

    private static detalleToResponse(detalle: DetalleVenta): DetalleVentaResponse {
        return {
            id: detalle.getId()!,
            productoId: detalle.getProductoId(),
            cantidad: detalle.getCantidad(),
            precioUnitario: detalle.getPrecioUnitario(),
            subtotal: detalle.getSubtotal()
        };
    }
}
