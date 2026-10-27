import { CreateProductoDto, UpdateProductoDto } from "../../../modules/productos/application/dtos";
import { ProductoResponse } from "../../../modules/productos/application/responses/producto.response";

export const MANAGE_PRODUCTO_PORT = Symbol('ManageProductoPort');

export interface ManageProductoPort {
    create(dto: CreateProductoDto): Promise<ProductoResponse>;
    update(id: number, dto: UpdateProductoDto): Promise<ProductoResponse>;
}
