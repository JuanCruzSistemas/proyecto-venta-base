import { Module } from "@nestjs/common";
import { PRODUCTOS_REPOSITORY_TOKEN } from "../../../domain/repositories/productos.repository.interface";
import { PrismaProductosRepository } from "./repositories/prisma-productos.repository";

@Module({
    providers: [
        {
            provide: PRODUCTOS_REPOSITORY_TOKEN,
            useClass: PrismaProductosRepository
        }
    ],
    exports: [
        PRODUCTOS_REPOSITORY_TOKEN
    ]
})
export class PrismaProductosPersistenceModule {}
