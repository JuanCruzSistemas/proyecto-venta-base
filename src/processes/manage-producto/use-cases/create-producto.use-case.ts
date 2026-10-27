import { Inject, Injectable } from "@nestjs/common";

import { type IUnitOfWork, UNIT_OF_WORK_TOKEN } from "../../../common/application/unit-of-work/unit-of-work.interface";

import { type ProductosPersistencePort, PRODUCTOS_PERSISTENCE_PORT } from "../../../modules/productos/domain/ports/productos-persistence.port";
import { ProductosFactory } from "../../../modules/productos/domain/factories/productos.factory";
import { CreateProductoDto } from "../../../modules/productos/application/dtos";
import { ProductoResponse } from "../../../modules/productos/application/responses/producto.response";
import { ProductoResponseMapper } from "../../../modules/productos/application/mappers/producto-response.mapper";
import { NombreProductoDuplicadoException } from "../../../modules/productos/application/exceptions/nombre-duplicado.exception";

import { type CategoriasPersistencePort, CATEGORIAS_PERSISTENCE_PORT } from "../../../modules/categorias/domain/ports/categorias-persistence.port";
import { CategoriaNoEncontradaException } from "../../../modules/categorias/application/exceptions/categoria-no-encontrada.exception";

@Injectable()
export class CreateProductoUseCase {
    constructor(
        @Inject(UNIT_OF_WORK_TOKEN)
        private readonly uow: IUnitOfWork,
        @Inject(PRODUCTOS_PERSISTENCE_PORT)
        private readonly productosRepo: ProductosPersistencePort,
        @Inject(CATEGORIAS_PERSISTENCE_PORT)
        private readonly categoriasRepo: CategoriasPersistencePort
    ) {}

    async execute(dto: CreateProductoDto): Promise<ProductoResponse> {
        return this.uow.runInTransaction(async () => {
            const categoriaExiste = await this.categoriasRepo.existsById(dto.categoriaId);
            if (!categoriaExiste) {
                throw new CategoriaNoEncontradaException();
            }

            const productoNombreDuplicado = await this.productosRepo.existsByNombre(dto.nombre);
            if (productoNombreDuplicado) {
                throw new NombreProductoDuplicadoException()
            }

            const producto = ProductosFactory.create({
                nombre: dto.nombre,
                categoriaId: dto.categoriaId,
                precio: dto.precio
            });
            const productoCreado = await this.productosRepo.create(producto);
            return ProductoResponseMapper.toResponse(productoCreado);
        });
    }
}
