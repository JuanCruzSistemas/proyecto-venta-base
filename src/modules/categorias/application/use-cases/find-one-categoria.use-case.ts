import { Inject } from "@nestjs/common";

import { type ICategoriasRepository, CATEGORIAS_REPOSITORY_TOKEN } from "../../domain/repositories/categorias.repository.interface";

import { CategoriaResponse } from "../responses/categoria.response";
import { CategoriaResponseMapper } from "../mappers/categoria-response.mapper";
import { CategoriaNoEncontradaException } from "../exceptions/categoria-no-encontrada.exception";

export class FindOneCategoriaUseCase {
    constructor(
        @Inject(CATEGORIAS_REPOSITORY_TOKEN)
        private readonly repo: ICategoriasRepository
    ) {}

    async execute(id: number): Promise<CategoriaResponse> {
        const categoria = await this.repo.findOneById(id);
        if (!categoria) {
            throw new CategoriaNoEncontradaException();
        }

        return CategoriaResponseMapper.toResponse(categoria);
    }
}