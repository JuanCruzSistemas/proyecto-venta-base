import { Injectable } from "@nestjs/common";

import { CategoriaResponse } from "../responses/categoria.response";
import { CategoriaResponseMapper } from "../mappers/categoria-response.mapper";
import { CategoriasFinder } from "../services/categorias.finder";

@Injectable()
export class FindOneCategoriaUseCase {
    constructor(
        private readonly finder: CategoriasFinder
    ) {}

    async execute(id: number): Promise<CategoriaResponse> {
        const categoria = await this.finder.findById(id);
        return CategoriaResponseMapper.toResponse(categoria);
    }
}
