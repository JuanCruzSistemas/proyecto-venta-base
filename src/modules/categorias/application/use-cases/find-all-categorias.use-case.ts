import { Inject, Injectable } from "@nestjs/common";
import { type CategoriasPersistencePort, CATEGORIAS_PERSISTENCE_PORT } from "../../domain/ports/categorias-persistence.port";
import { CategoriaResponse } from "../responses/categoria.response";
import { CategoriaResponseMapper } from "../mappers/categoria-response.mapper";

@Injectable()
export class FindAllCategoriasUseCase {
    constructor(
        @Inject(CATEGORIAS_PERSISTENCE_PORT)
        private readonly repo: CategoriasPersistencePort
    ) {}

    async execute(): Promise<CategoriaResponse[]> {
        const categorias = await this.repo.findAll();
        return categorias.map(CategoriaResponseMapper.toResponse);
    }
}