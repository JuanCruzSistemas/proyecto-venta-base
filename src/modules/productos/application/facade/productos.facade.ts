import { Injectable } from "@nestjs/common";

import { FiltroActivoDto } from "../dtos";
import { ProductoResponse } from "../responses/producto.response";
import { ActivateProductoUseCase, DeactivateProductoUseCase, FindAllProductosUseCase, FindOneProductoUseCase } from "../use-cases";

@Injectable()
export class ProductosFacade {
    constructor(
        private readonly findOneProductoUseCase: FindOneProductoUseCase,
        private readonly findAllProductosUseCase: FindAllProductosUseCase,
        private readonly activateProductoUseCase: ActivateProductoUseCase,
        private readonly deactivateProductoUseCase: DeactivateProductoUseCase
    ) {}

    async findOne(id: number): Promise<ProductoResponse> {
        return this.findOneProductoUseCase.execute(id);
    }

    async findAll(filtro: FiltroActivoDto): Promise<ProductoResponse[]> {
        return this.findAllProductosUseCase.execute(filtro);
    }

    async activate(id: number): Promise<ProductoResponse> {
        return this.activateProductoUseCase.execute(id);
    }

    async deactivate(id: number): Promise<ProductoResponse> {
        return this.deactivateProductoUseCase.execute(id);
    }
}
