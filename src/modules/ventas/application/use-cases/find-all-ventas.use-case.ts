import { Inject, Injectable } from "@nestjs/common";
import { type VentasPersistencePort, VENTAS_PERSISTENCE_PORT } from "../../domain/ports/ventas-persistence.port";
import { VentaResponse } from "../responses/venta.response";
import { VentaResponseMapper } from "../mappers/venta-response.mapper";

@Injectable()
export class FindAllVentasUseCase {
    constructor(
        @Inject(VENTAS_PERSISTENCE_PORT)
        private readonly repo: VentasPersistencePort
    ) {}

    async execute(): Promise<VentaResponse[]> {
        const ventas = await this.repo.findAll();
        return ventas.map(VentaResponseMapper.toResponse);
    }
}
