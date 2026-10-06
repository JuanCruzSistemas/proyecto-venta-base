import { Inject } from "@nestjs/common";

import { type IUnitOfWork, UNIT_OF_WORK_TOKEN } from "../../../common/application/unit-of-work/unit-of-work.interface";

import { type IProductosRepository, PRODUCTOS_REPOSITORY_TOKEN } from "../../../modules/productos/domain/repositories/productos.repository.interface";
import { UpdateProductoDto } from "../../../modules/productos/application/dtos";
import { ProductoNoEncontradoException } from "../../../modules/productos/application/exceptions/producto-no-encontrado.exception";
import { ProductoResponse } from "../../../modules/productos/application/responses/producto.response";
import { ProductoResponseMapper } from "../../../modules/productos/application/mappers/producto-response.mapper";

import { type ICategoriasRepository, CATEGORIAS_REPOSITORY } from "../../../modules/categorias/domain/repositories/categorias.repository.interface";
import { NombreProductoDuplicadoException } from "../../../modules/productos/application/exceptions/nombre-duplicado.exception";
import { CategoriaNoEncontradaException } from "../../../modules/categorias/application/exceptions/categoria-no-encontrada.exception";

export class UpdateProductoUseCase {
    constructor(
        @Inject(UNIT_OF_WORK_TOKEN)
        private readonly uow: IUnitOfWork,
        @Inject(PRODUCTOS_REPOSITORY_TOKEN)
        private readonly productosRepo: IProductosRepository,
        @Inject(CATEGORIAS_REPOSITORY)
        private readonly categoriasRepo: ICategoriasRepository
    ) {}

    async execute(id: number, dto: UpdateProductoDto): Promise<ProductoResponse> {
        return this.uow.runInTransaction(async () => {
            const producto = await this.productosRepo.findOneById(id);
            if (!producto) {
                throw new ProductoNoEncontradoException();
            }

            if (dto.categoriaId) {
                const categoriaExiste = await this.categoriasRepo.existsById(dto.categoriaId);
                if (!categoriaExiste) {
                    throw new CategoriaNoEncontradaException();
                }
            }

            if (dto.nombre) {
                const productoExistePorNombre = await this.productosRepo.existsByNombre(dto.nombre);
                if (productoExistePorNombre) {
                    throw new NombreProductoDuplicadoException();
                }
            }

            producto.actualizar(dto);
            const productoActualizado = await this.productosRepo.update(producto);
            return ProductoResponseMapper.toResponse(productoActualizado);
        });
    }
}