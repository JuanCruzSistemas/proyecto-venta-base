import { Module } from "@nestjs/common";

// import { TypeOrmVentasPersistenceModule } from "./infraestructure/persistence/typeorm-persistence/typeorm-ventas-persistence.module";
import { FindAllVentasUseCase } from "./application/use-cases/find-all-ventas.use-case";
import { FindOneVentaUseCase } from "./application/use-cases/find-one.use-case";
import { VentasFacade } from "./application/facades/ventas.facade";
import { PrismaVentasPersistenceModule } from "./infraestructure/persistence/prisma-persistence/prisma-ventas-persistence.module";

@Module({
    imports: [
        // TypeOrmVentasPersistenceModule,
        PrismaVentasPersistenceModule
    ],
    providers: [
        FindAllVentasUseCase,
        FindOneVentaUseCase,
        VentasFacade
    ],
    exports: [
        // TypeOrmVentasPersistenceModule,
        PrismaVentasPersistenceModule,
        VentasFacade
    ]
})
export class VentasModule {}