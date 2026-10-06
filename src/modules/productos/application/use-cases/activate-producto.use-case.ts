import { Inject, Injectable } from "@nestjs/common";

import { type IProductosRepository, PRODUCTOS_REPOSITORY_TOKEN } from "../../domain/repositories/productos.repository.interface";

import { ProductoResponse } from "../responses/producto.response";
import { ProductoResponseMapper } from "../mappers/producto-response.mapper";
import { ProductoNoEncontradoException } from "../exceptions/producto-no-encontrado.exception";

@Injectable()
export class ActivateProductoUseCase {
    constructor(
        @Inject(PRODUCTOS_REPOSITORY_TOKEN)
        private readonly repo: IProductosRepository
    ) {}

    async execute(id: number): Promise<ProductoResponse> {
        const producto = await this.repo.findOneById(id);
        if (!producto) {
            throw new ProductoNoEncontradoException();
        }

        producto.activar();
        const productoActivado = await this.repo.update(producto);
        return ProductoResponseMapper.toResponse(productoActivado);
    }
}
