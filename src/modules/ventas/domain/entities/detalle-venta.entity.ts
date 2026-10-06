import { Precio } from "../../../../common/domain/value-objects/precio.vo";
import { Producto } from "../../../productos/domain/entities/producto.entity";

import { Cantidad } from "../value-objects/cantidad.vo";

export class DetalleVenta {
    constructor(
        private id: number | null,
        private productoId: number,
        private producto: Producto,
        private cantidad: Cantidad,
        private precioUnitario: Precio,
        private subtotal: number
    ) {}

    public static calcularSubtotal(cantidad: number, precioUnitario: number): number {
        return cantidad * precioUnitario;
    }

    public getId(): number | null {
        return this.id;
    }

    public getProducto(): Producto {
        return this.producto;
    }

    public getProductoId(): number {
        return this.productoId;
    }

    public getCantidad(): number {
        return this.cantidad.getValue();
    }

    public getPrecioUnitario(): number {
        return this.precioUnitario.getValue();
    }

    public getSubtotal(): number {
        return this.subtotal;
    }
}