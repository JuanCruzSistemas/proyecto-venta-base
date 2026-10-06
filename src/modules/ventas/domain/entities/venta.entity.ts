import { DetalleVenta } from "./detalle-venta.entity";

export class Venta {
    constructor(
        private id: number | null,
        private total: number,
        private detalles: DetalleVenta[],
        private fecha: Date = new Date(),
    ) {}

    public static calcularTotal(detalles: DetalleVenta[]): number {
        return detalles.reduce((acumulado, d2) => acumulado + d2.getSubtotal(), 0);
    }

    public getId(): number | null {
        return this.id;
    }

    public getFecha(): Date {
        return this.fecha;
    }

    public getTotal(): number {
        return this.total;
    }

    public getDetalles(): DetalleVenta[] {
        return this.detalles;
    }
}