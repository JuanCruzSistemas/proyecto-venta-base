import { Inject, Injectable } from "@nestjs/common";

import { type CategoriasPersistencePort, CATEGORIAS_PERSISTENCE_PORT } from "../../domain/ports/categorias-persistence.port";

import { UpdateCategoriaDto } from "../dtos/update-categoria.dto";
import { CategoriaResponse } from "../responses/categoria.response";
import { CategoriaResponseMapper } from "../mappers/categoria-response.mapper";

import { CategoriasFinder } from "../services/categorias.finder";
import { CategoriaExistenceValidator } from "../services/categoria-existence.validator";

@Injectable()
export class UpdateCategoriaUseCase {
    constructor(
        @Inject(CATEGORIAS_PERSISTENCE_PORT)
        private readonly repo: CategoriasPersistencePort,
        private readonly finder: CategoriasFinder,
        private readonly existenceValidator: CategoriaExistenceValidator
    ) {}

    async execute(id: number, dto: UpdateCategoriaDto): Promise<CategoriaResponse> {
        const categoria = await this.finder.findById(id);

        if (!dto.nombre) {
            return CategoriaResponseMapper.toResponse(categoria);
        }

        await this.existenceValidator.existsByNombre(dto.nombre);

        categoria.cambiarNombre(dto.nombre);
        const categoriaActualizada = await this.repo.update(categoria);

        return CategoriaResponseMapper.toResponse(categoriaActualizada);
    }
}
