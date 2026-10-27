import { Inject, Injectable } from "@nestjs/common";

import { type ProductosPersistencePort, PRODUCTOS_PERSISTENCE_PORT } from "../../domain/ports/productos-persistence.port";

import { FiltroActivoDto } from "../dtos";
import { ProductoResponse } from "../responses/producto.response";
import { ProductoResponseMapper } from "../mappers/producto-response.mapper";

@Injectable()
export class FindAllProductosUseCase {
    constructor(
        @Inject(PRODUCTOS_PERSISTENCE_PORT)
        private readonly repo: ProductosPersistencePort
    ) {}

    async execute(filtro: FiltroActivoDto): Promise<ProductoResponse[]> {
        const productos = await this.repo.findAll(filtro.activo);
        return productos.map(ProductoResponseMapper.toResponse);
    }
}