import { VentaResponse } from "../../../../modules/ventas/application/responses/venta.response";
import { CreateVentaDto } from "../dtos/create-venta.dto";

export const CREATE_VENTA_PORT = Symbol('CreateVentaPort');

export interface CreateVentaPort {
    create(dto: CreateVentaDto): Promise<VentaResponse>;
}
