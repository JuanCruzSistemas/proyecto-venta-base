import { FiltroActivoDto } from "../dtos";
import { ProductoResponse } from "../responses/producto.response";

export const PRODUCTOS_APPLICATION_PORT = Symbol('ProductosApplicationPort');

export interface ProductosApplicationPort {
    findOne(id: number): Promise<ProductoResponse>;
    findAll(filtro: FiltroActivoDto): Promise<ProductoResponse[]>;
    activate(id: number): Promise<ProductoResponse>;
    deactivate(id: number): Promise<ProductoResponse>;
}
