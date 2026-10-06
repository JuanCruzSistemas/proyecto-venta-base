import { Inject, Injectable } from "@nestjs/common";

import { type ICategoriasRepository, CATEGORIAS_REPOSITORY } from "../../../modules/categorias/domain/repositories/categorias.repository.interface";
import { CategoriaResponse } from "../../../modules/categorias/application/responses/categoria.response";
import { CategoriaNoEncontrada } from "../../../modules/categorias/application/exceptions/categoria-no-encontrada.exception";
import { CategoriaResponseMapper } from "../../../modules/categorias/application/mappers/categoria-response.mapper";
import { CategoriaConProductosAsociadosException } from "../../../modules/categorias/application/exceptions/categoria-con-productos.exception";
import { type IProductosRepository, PRODUCTOS_REPOSITORY_TOKEN } from "../../../modules/productos/domain/repositories/productos.repository.interface";
import { type IUnitOfWork, UNIT_OF_WORK_TOKEN } from "../../../common/application/unit-of-work/unit-of-work.interface";



@Injectable()
export class DeleteCategoriaUseCase {
    constructor(
        @Inject(UNIT_OF_WORK_TOKEN)
        private readonly uow: IUnitOfWork,
        @Inject(CATEGORIAS_REPOSITORY)
        private readonly categoriasRepo: ICategoriasRepository,
        @Inject(PRODUCTOS_REPOSITORY_TOKEN)
        private readonly productosRepo: IProductosRepository
    ) {}

    async execute(id: number): Promise<CategoriaResponse> {
        return this.uow.runInTransaction(async () => {
            const categoria = await this.categoriasRepo.findOneById(id);
            if (!categoria) {
                throw new CategoriaNoEncontrada();
            }
    
            const countProductos = await this.productosRepo.countByCategoria(id);
            if (countProductos > 0) {
                throw new CategoriaConProductosAsociadosException();
            }
    
            await this.categoriasRepo.remove(categoria);
            return CategoriaResponseMapper.toResponse(categoria);
        });
    }
}
