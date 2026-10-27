import { Inject, Injectable } from "@nestjs/common";
import { type VentasPersistencePort, VENTAS_PERSISTENCE_PORT } from "../../domain/ports/ventas-persistence.port";
import { VentaResponse } from "../responses/venta.response";
import { VentaNoEncontradaException } from "../exceptions/venta-no-encontrada.exception";
import { VentaResponseMapper } from "../mappers/venta-response.mapper";

@Injectable()
export class FindOneVentaUseCase {
    constructor(
        @Inject(VENTAS_PERSISTENCE_PORT)
        private readonly repo: VentasPersistencePort
    ) {}

    async execute(id: number): Promise<VentaResponse> {
        const venta = await this.repo.findOne(id);
        if (!venta) {
            throw new VentaNoEncontradaException();
        }
        return VentaResponseMapper.toResponse(venta);
    }
}
