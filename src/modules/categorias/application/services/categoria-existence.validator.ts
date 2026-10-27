import { Inject, Injectable } from "@nestjs/common";

import { type CategoriasPersistencePort, CATEGORIAS_PERSISTENCE_PORT } from "../../domain/ports/categorias-persistence.port";
import { NombreCategoriaDuplicadoException } from "../exceptions/nombre-duplicado.exception";

@Injectable()
export class CategoriaExistenceValidator {
    constructor(
        @Inject(CATEGORIAS_PERSISTENCE_PORT)
        private readonly repo: CategoriasPersistencePort
    ) {}

    async existsByNombre(nombre: string): Promise<void> {
        const exists = await this.repo.existsByNombre(nombre);
        if (exists) {
            throw new NombreCategoriaDuplicadoException();
        }
    }
}
