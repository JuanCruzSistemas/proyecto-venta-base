import { Inject, Injectable } from "@nestjs/common";
import { type ICategoriasRepository, CATEGORIAS_REPOSITORY } from "../../domain/repositories/categorias.repository.interface";
import { CategoriaResponse } from "../responses/categoria.response";
import { CategoriaNoEncontrada } from "../exceptions/categoria-no-encontrada.exception";
import { CategoriaResponseMapper } from "../mappers/categoria-response.mapper";
import { CategoriaConProductosAsociadosException } from "../exceptions/categoria-con-productos.exception";

@Injectable()
export class DeleteCategoriaUseCase {
    constructor(
        @Inject(CATEGORIAS_REPOSITORY)
        private readonly repo: ICategoriasRepository
    ) {}

    async execute(id: number): Promise<CategoriaResponse> {
        const categoria = await this.repo.findOneById(id);
        if (!categoria) {
            throw new CategoriaNoEncontrada();
        }

        const countProductos = await this.repo.countProductosAsociados(id);
        if (countProductos > 0) {
            throw new CategoriaConProductosAsociadosException();
        }

        await this.repo.remove(categoria);
        return CategoriaResponseMapper.toResponse(categoria);
    }
}
