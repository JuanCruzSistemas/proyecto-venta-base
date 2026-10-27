import { Injectable } from "@nestjs/common";
import { VentaResponse } from "../responses/venta.response";
import { FindAllVentasUseCase } from "../use-cases/find-all-ventas.use-case";
import { FindOneVentaUseCase } from "../use-cases/find-one.use-case";
import { VentasApplicationPort } from "../ports/ventas-application.port";

@Injectable()
export class VentasFacade implements VentasApplicationPort {
    constructor(
        private readonly findAllVentasUseCase: FindAllVentasUseCase,
        private readonly findOneVentaUseCase: FindOneVentaUseCase
    ) {}

    async findAll(): Promise<VentaResponse[]> {
        return this.findAllVentasUseCase.execute();
    }

    async findOne(id: number): Promise<VentaResponse> {
        return this.findOneVentaUseCase.execute(id);
    }
}