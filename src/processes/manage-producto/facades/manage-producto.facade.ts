import { Injectable } from "@nestjs/common";

import { CreateProductoDto, UpdateProductoDto } from "../../../modules/productos/application/dtos";
import { ProductoResponse } from "../../../modules/productos/application/responses/producto.response";

import { CreateProductoUseCase } from "../use-cases/create-producto.use-case";

@Injectable()
export class ManageProductoFacade {
    constructor(
        private readonly createProductoUseCase: CreateProductoUseCase
    ) {}

    async create(dto: CreateProductoDto): Promise<ProductoResponse> {
        return this.createProductoUseCase.execute(dto);
    }

    async update(id: number, dto: UpdateProductoDto): Promise<ProductoResponse> {
        return 
    }
}
