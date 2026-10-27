import { Venta } from "../entities/venta.entity";

export const VENTAS_PERSISTENCE_PORT = Symbol('VentasPersistencePort');

export interface VentasPersistencePort {
    findAll(): Promise<Venta[]>;
    findOne(id: number): Promise<Venta | null>;
    create(data: Venta): Promise<Venta>;
}
