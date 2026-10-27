import { Inject, Injectable } from "@nestjs/common";

import { type ProductosPersistencePort, PRODUCTOS_PERSISTENCE_PORT } from "../../domain/ports/productos-persistence.port";

import { ProductoResponse } from "../responses/producto.response";
import { ProductoResponseMapper } from "../mappers/producto-response.mapper";
import { ProductosFinder } from "../services/productos.finder";

@Injectable()
export class ActivateProductoUseCase {
    constructor(
        @Inject(PRODUCTOS_PERSISTENCE_PORT)
        private readonly repo: ProductosPersistencePort,
        private readonly finder: ProductosFinder
    ) {}

    async execute(id: number): Promise<ProductoResponse> {
        const producto = await this.finder.findById(id);

        producto.activar();
        const productoActivado = await this.repo.update(producto);

        return ProductoResponseMapper.toResponse(productoActivado);
    }
}
