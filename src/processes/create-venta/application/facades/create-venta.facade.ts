import { Injectable } from "@nestjs/common";

import { CreateVentaUseCase } from "../use-cases/create-venta.use-case";
import { CreateVentaDto } from "../dtos/create-venta.dto";
import { VentaResponse } from "../../../../modules/ventas/application/responses/venta.response";
import { CreateVentaPort } from "../ports/create-venta.port";

@Injectable()
export class CreateVentaFacade implements CreateVentaPort {
    constructor(
        private readonly createVentaUseCase: CreateVentaUseCase
    ) {}

    async create(dto: CreateVentaDto): Promise<VentaResponse> {
        return this.createVentaUseCase.execute(dto);
    }
}