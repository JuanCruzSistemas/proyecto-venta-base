import { Injectable } from "@nestjs/common";

import { CreateProductoDto, UpdateProductoDto } from "../../../modules/productos/application/dtos";
import { ProductoResponse } from "../../../modules/productos/application/responses/producto.response";

import { CreateProductoUseCase } from "../use-cases/create-producto.use-case";
import { UpdateProductoUseCase } from "../use-cases/update-producto.use-case";

@Injectable()
export class ManageProductoFacade {
    constructor(
        private readonly createProductoUseCase: CreateProductoUseCase,
        private readonly updateProductoUseCase: UpdateProductoUseCase,
    ) {}

    async create(dto: CreateProductoDto): Promise<ProductoResponse> {
        return this.createProductoUseCase.execute(dto);
    }

    async update(id: number, dto: UpdateProductoDto): Promise<ProductoResponse> {
        return this.updateProductoUseCase.execute(id, dto);
    }
}
