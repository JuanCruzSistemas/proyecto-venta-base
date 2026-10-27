import { Inject, Injectable } from "@nestjs/common";

import { type CategoriasPersistencePort, CATEGORIAS_PERSISTENCE_PORT } from "../../domain/ports/categorias-persistence.port";
import { Categoria } from "../../domain/entities/categoria.entity";

import { CategoriaNoEncontradaException } from "../exceptions/categoria-no-encontrada.exception";

@Injectable()
export class CategoriasFinder {
    constructor(
        @Inject(CATEGORIAS_PERSISTENCE_PORT)
        private readonly repo: CategoriasPersistencePort
    ) {}

    async findById(id: number): Promise<Categoria> {
        const categoria = await this.repo.findOneById(id);
        if (!categoria) {
            throw new CategoriaNoEncontradaException();
        }
        return categoria;
    }
}
