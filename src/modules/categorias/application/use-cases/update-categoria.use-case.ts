import { Inject, Injectable } from "@nestjs/common";

import { type ICategoriasRepository, CATEGORIAS_REPOSITORY_TOKEN } from "../../domain/repositories/categorias.repository.interface";

import { UpdateCategoriaDto } from "../dtos/update-categoria.dto";
import { CategoriaResponse } from "../responses/categoria.response";
import { CategoriaResponseMapper } from "../mappers/categoria-response.mapper";
import { CategoriaNoEncontradaException } from "../exceptions/categoria-no-encontrada.exception";
import { NombreCategoriaDuplicadoException } from "../exceptions/nombre-duplicado.exception";

@Injectable()
export class UpdateCategoriaUseCase {
    constructor(
        @Inject(CATEGORIAS_REPOSITORY_TOKEN)
        private readonly repo: ICategoriasRepository,
    ) {}

    async execute(id: number, dto: UpdateCategoriaDto): Promise<CategoriaResponse> {
        const categoria = await this.repo.findOneById(id);
        if (!categoria) {
            throw new CategoriaNoEncontradaException();
        }

        if (!dto.nombre) {
            return CategoriaResponseMapper.toResponse(categoria);
        }

        const exists = await this.repo.existsByNombre(dto.nombre)
        if (exists) {
            throw new NombreCategoriaDuplicadoException();
        }

        categoria.cambiarNombre(dto.nombre ?? categoria.getNombre());
        const categoriaActualizada = await this.repo.update(categoria);
        return CategoriaResponseMapper.toResponse(categoriaActualizada);
    }
}
