import { Inject, Injectable } from "@nestjs/common";

import { type ProductosPersistencePort, PRODUCTOS_PERSISTENCE_PORT } from "../../domain/ports/productos-persistence.port";
import { Producto } from "../../domain/entities/producto.entity";

import { ProductoNoEncontradoException } from "../exceptions/producto-no-encontrado.exception";

@Injectable()
export class ProductosFinder {
    constructor(
        @Inject(PRODUCTOS_PERSISTENCE_PORT)
        private readonly repo: ProductosPersistencePort
    ) {}

    async findById(id: number): Promise<Producto> {
        const producto = await this.repo.findOneById(id);
        if (!producto) {
            throw new ProductoNoEncontradoException();
        }
        return producto;
    }
}
