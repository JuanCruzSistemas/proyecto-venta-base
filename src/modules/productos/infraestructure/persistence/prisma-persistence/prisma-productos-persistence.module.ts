import { Module } from "@nestjs/common";
import { PRODUCTOS_PERSISTENCE_PORT } from "../../../domain/ports/productos-persistence.port";
import { ProductosRepository } from "./repositories/prisma-productos.repository";

@Module({
    providers: [
        {
            provide: PRODUCTOS_PERSISTENCE_PORT,
            useClass: ProductosRepository
        }
    ],
    exports: [
        PRODUCTOS_PERSISTENCE_PORT
    ]
})
export class ProductosPersistenceModule {}
