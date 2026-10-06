import { Inject, Injectable } from "@nestjs/common";

import { type IProductosRepository, PRODUCTOS_REPOSITORY_TOKEN } from "../../domain/repositories/productos.repository.interface";

import { FiltroActivoDto } from "../dtos";
import { ProductoResponse } from "../responses/producto.response";
import { ProductoResponseMapper } from "../mappers/producto-response.mapper";

@Injectable()
export class FindAllProductosUseCase {
    constructor(
        @Inject(PRODUCTOS_REPOSITORY_TOKEN)
        private readonly repo: IProductosRepository
    ) {}

    async execute(filtro: FiltroActivoDto): Promise<ProductoResponse[]> {
        const productos = await this.repo.findAll(filtro.activo);
        return productos.map(ProductoResponseMapper.toResponse);
    }
}