import { Injectable } from "@nestjs/common";

import { CategoriaResponse } from "../../../modules/categorias/application/responses/categoria.response";

import { DeleteCategoriaUseCase } from "../use-cases/delete-categoria.use-case";
import { DeleteCategoriaPort } from "../ports/delete-categoria.port";

@Injectable()
export class DeleteCategoriaFacade implements DeleteCategoriaPort {
    constructor(
        private readonly deleteCategoriaUseCase: DeleteCategoriaUseCase
    ) {}

    async delete(id: number): Promise<CategoriaResponse> {
        return this.deleteCategoriaUseCase.execute(id);
    }
}
