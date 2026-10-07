import { Injectable } from "@nestjs/common";

import { CreateVentaUseCase } from "../use-cases/create-venta.use-case";
import { CreateVentaDto } from "../dtos/create-venta.dto";
import { VentaResponse } from "../../../../modules/ventas/application/responses/venta.response";

@Injectable()
export class CreateVentaFacade {
    constructor(
        private readonly createVentaUseCase: CreateVentaUseCase
    ) {}

    async create(dto: CreateVentaDto): Promise<VentaResponse> {
        return this.createVentaUseCase.execute(dto);
    }
}