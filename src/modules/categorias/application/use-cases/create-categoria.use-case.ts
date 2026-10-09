import { Inject, Injectable } from "@nestjs/common";

import { type ICategoriasRepository, CATEGORIAS_REPOSITORY_TOKEN } from "../../domain/repositories/categorias.repository.interface";
import { Categoria } from "../../domain/entities/categoria.entity";

import { CreateCategoriaDto } from "../dtos/create-categoria.dto";
import { CategoriaResponse } from "../responses/categoria.response";
import { CategoriaResponseMapper } from "../mappers/categoria-response.mapper";
import { NombreCategoriaDuplicadoException } from "../exceptions/nombre-duplicado.exception";

@Injectable()
export class CreateCategoriaUseCase {
    constructor(
        @Inject(CATEGORIAS_REPOSITORY_TOKEN)
        private readonly repo: ICategoriasRepository
    ) {}

    async execute(dto: CreateCategoriaDto): Promise<CategoriaResponse> {
        const exists = await this.repo.existsByNombre(dto.nombre);
        if (exists) {
            throw new NombreCategoriaDuplicadoException();
        }
        
        const categoria = Categoria.create({
            nombre: dto.nombre
        });
        
        const categoriaSaved = await this.repo.create(categoria);
        return CategoriaResponseMapper.toResponse(categoriaSaved);
    }
}