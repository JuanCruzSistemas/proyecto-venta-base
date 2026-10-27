import { Inject } from "@nestjs/common";

import { type CategoriasPersistencePort, CATEGORIAS_PERSISTENCE_PORT } from "../../domain/ports/categorias-persistence.port";

import { CategoriaResponse } from "../responses/categoria.response";
import { CategoriaResponseMapper } from "../mappers/categoria-response.mapper";
import { CategoriaNoEncontradaException } from "../exceptions/categoria-no-encontrada.exception";

export class FindOneCategoriaUseCase {
    constructor(
        @Inject(CATEGORIAS_PERSISTENCE_PORT)
        private readonly repo: CategoriasPersistencePort
    ) {}

    async execute(id: number): Promise<CategoriaResponse> {
        const categoria = await this.repo.findOneById(id);
        if (!categoria) {
            throw new CategoriaNoEncontradaException();
        }

        return CategoriaResponseMapper.toResponse(categoria);
    }
}