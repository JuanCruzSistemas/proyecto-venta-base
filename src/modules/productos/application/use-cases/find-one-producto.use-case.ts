import { Injectable } from "@nestjs/common";

import { ProductoResponse } from "../responses/producto.response";
import { ProductoResponseMapper } from "../mappers/producto-response.mapper";
import { ProductosFinder } from "../services/productos.finder";

@Injectable()
export class FindOneProductoUseCase {
    constructor(
        private readonly finder: ProductosFinder
    ) {}

    async execute(id: number): Promise<ProductoResponse> {
        const producto = await this.finder.findById(id);
        return ProductoResponseMapper.toResponse(producto);
    }
}
