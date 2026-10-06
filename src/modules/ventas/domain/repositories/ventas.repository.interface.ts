import { Venta } from "../entities/venta.entity";

export const VENTAS_REPOSITORY_TOKEN = Symbol('IVentasRepository');

export interface IVentasRepository {
    findAll(): Promise<Venta[]>;
    findOne(id: number): Promise<Venta | null>;
    create(data: Venta): Promise<Venta>;
}
