import { Inject, Injectable } from "@nestjs/common";
import { type IVentasRepository, VENTAS_REPOSITORY_TOKEN } from "../../domain/repositories/ventas.repository.interface";
import { VentaResponse } from "../responses/venta.response";
import { VentaNoEncontradaException } from "../exceptions/venta-no-encontrada.exception";
import { VentaResponseMapper } from "../mappers/venta-response.mapper";

@Injectable()
export class FindOneVentaUseCase {
    constructor(
        @Inject(VENTAS_REPOSITORY_TOKEN)
        private readonly repo: IVentasRepository
    ) {}

    async execute(id: number): Promise<VentaResponse> {
        const venta = await this.repo.findOne(id);
        if (!venta) {
            throw new VentaNoEncontradaException();
        }
        return VentaResponseMapper.toResponse(venta);
    }
}
