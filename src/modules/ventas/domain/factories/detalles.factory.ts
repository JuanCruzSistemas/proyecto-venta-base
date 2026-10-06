import { Precio } from "../../../../common/domain/value-objects/precio.vo";
import { DetalleVenta } from "../entities/detalle-venta.entity";
import { CreateDetalleInput } from "../inputs/create-detalle.interface";
import { Cantidad } from "../value-objects/cantidad.vo";

export class DetallesFactory {
    public static create(data: CreateDetalleInput): DetalleVenta {
        const cantidad = Cantidad.create(data.cantidad);
        const precioUnitario = data.producto.getPrecio();
        const precioVO = Precio.create(precioUnitario);
        const subtotal = DetalleVenta.calcularSubtotal(cantidad.getValue(), precioUnitario)
        return new DetalleVenta(
            null,
            data.producto.getId()!,
            data.producto,
            cantidad,
            precioVO,
            subtotal
        );
    }
}