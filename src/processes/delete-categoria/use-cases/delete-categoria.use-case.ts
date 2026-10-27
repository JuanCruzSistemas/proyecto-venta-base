import { Inject, Injectable } from "@nestjs/common";

import { type IUnitOfWork, UNIT_OF_WORK_TOKEN } from "../../../common/application/unit-of-work/unit-of-work.interface";

import { type ProductosPersistencePort, PRODUCTOS_PERSISTENCE_PORT } from "../../../modules/productos/domain/ports/productos-persistence.port";

import { type CategoriasPersistencePort, CATEGORIAS_PERSISTENCE_PORT } from "../../../modules/categorias/domain/ports/categorias-persistence.port";
import { CategoriaResponse } from "../../../modules/categorias/application/responses/categoria.response";
import { CategoriaNoEncontradaException } from "../../../modules/categorias/application/exceptions/categoria-no-encontrada.exception";
import { CategoriaResponseMapper } from "../../../modules/categorias/application/mappers/categoria-response.mapper";
import { CategoriaConProductosAsociadosException } from "../../../modules/categorias/application/exceptions/categoria-con-productos.exception";

@Injectable()
export class DeleteCategoriaUseCase {
    constructor(
        @Inject(UNIT_OF_WORK_TOKEN)
        private readonly uow: IUnitOfWork,
        @Inject(CATEGORIAS_PERSISTENCE_PORT)
        private readonly categoriasRepo: CategoriasPersistencePort,
        @Inject(PRODUCTOS_PERSISTENCE_PORT)
        private readonly productosRepo: ProductosPersistencePort
    ) {}

    async execute(id: number): Promise<CategoriaResponse> {
        return this.uow.runInTransaction(async () => {
            const categoria = await this.categoriasRepo.findOneById(id);
            if (!categoria) {
                throw new CategoriaNoEncontradaException();
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
