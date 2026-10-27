import { Inject, Injectable } from "@nestjs/common";

import { type ProductosPersistencePort, PRODUCTOS_PERSISTENCE_PORT } from "../../domain/ports/productos-persistence.port";

import { ProductoResponse } from "../responses/producto.response";
import { ProductoResponseMapper } from "../mappers/producto-response.mapper";
import { ProductoNoEncontradoException } from "../exceptions/producto-no-encontrado.exception";

@Injectable()
export class FindOneProductoUseCase {
    constructor(
        @Inject(PRODUCTOS_PERSISTENCE_PORT)
        private readonly repo: ProductosPersistencePort
    ) {}

    async execute(id: number): Promise<ProductoResponse> {
        const producto = await this.repo.findOneById(id);
        if (!producto) {
            throw new ProductoNoEncontradoException();
        }
        return ProductoResponseMapper.toResponse(producto);
    }
}