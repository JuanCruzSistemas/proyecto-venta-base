import { Venta } from "../entities/venta.entity";
import { CreateVentaInput } from "../inputs/create-venta.interface";
import { DetallesFactory } from "./detalles.factory";

export class VentasFactory {
    public static create(data: CreateVentaInput): Venta {
        const detalles = data.detalles.map(DetallesFactory.create);
        const total = Venta.calcularTotal(detalles);
        return new Venta(
            null,
            total,
            detalles
        );
    }
}
