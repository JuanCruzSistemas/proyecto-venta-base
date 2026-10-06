import { Inject, Injectable } from "@nestjs/common";
import { type IVentasRepository, VENTAS_REPOSITORY_TOKEN } from "../../domain/repositories/ventas.repository.interface";
import { VentaResponse } from "../responses/venta.response";
import { VentaResponseMapper } from "../mappers/venta-response.mapper";

@Injectable()
export class FindAllVentasUseCase {
    constructor(
        @Inject(VENTAS_REPOSITORY_TOKEN)
        private readonly repo: IVentasRepository
    ) {}

    async execute(): Promise<VentaResponse[]> {
        const ventas = await this.repo.findAll();
        return ventas.map(VentaResponseMapper.toResponse);
    }
}
