import { Module } from "@nestjs/common";
import { VENTAS_REPOSITORY_TOKEN } from "../../../domain/repositories/ventas.repository.interface";
import { PrismaVentasRepository } from "./repositories/prisma-ventas.repository";

@Module({
    providers: [
        {
            provide: VENTAS_REPOSITORY_TOKEN,
            useClass: PrismaVentasRepository
        }
    ],
    exports: [
        VENTAS_REPOSITORY_TOKEN
    ]
})
export class PrismaVentasPersistenceModule {}
