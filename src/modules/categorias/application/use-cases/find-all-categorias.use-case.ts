import { Inject, Injectable } from "@nestjs/common";
import { type ICategoriasRepository, CATEGORIAS_REPOSITORY_TOKEN } from "../../domain/repositories/categorias.repository.interface";
import { CategoriaResponse } from "../responses/categoria.response";
import { CategoriaResponseMapper } from "../mappers/categoria-response.mapper";

@Injectable()
export class FindAllCategoriasUseCase {
    constructor(
        @Inject(CATEGORIAS_REPOSITORY_TOKEN)
        private readonly repo: ICategoriasRepository
    ) {}

    async execute(): Promise<CategoriaResponse[]> {
        const categorias = await this.repo.findAll();
        return categorias.map(CategoriaResponseMapper.toResponse);
    }
}