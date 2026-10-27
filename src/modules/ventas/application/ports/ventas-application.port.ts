import { VentaResponse } from "../responses/venta.response";

export const VENTAS_APPLICATION_PORT = Symbol('VentasApplicationPort');

export interface VentasApplicationPort {
    findAll(): Promise<VentaResponse[]>;
    findOne(id: number): Promise<VentaResponse>;
}
