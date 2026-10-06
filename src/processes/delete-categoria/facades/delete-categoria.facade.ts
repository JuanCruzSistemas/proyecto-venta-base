import { Injectable } from "@nestjs/common";

import { CategoriaResponse } from "../../../modules/categorias/application/responses/categoria.response";

import { DeleteCategoriaUseCase } from "../use-cases/delete-categoria.use-case";

@Injectable()
export class DeleteCategoriaFacade {
    constructor(
        private readonly deleteCategoriaUseCase: DeleteCategoriaUseCase
    ) {}

    async delete(id: number): Promise<CategoriaResponse> {
        return this.deleteCategoriaUseCase.execute(id);
    }
}