import { Module } from "@nestjs/common";

// import { TypeOrmVentasPersistenceModule } from "./infraestructure/persistence/typeorm-persistence/typeorm-ventas-persistence.module";
import { FindAllVentasUseCase } from "./application/use-cases/find-all-ventas.use-case";
import { FindOneVentaUseCase } from "./application/use-cases/find-one.use-case";
import { VentasFacade } from "./application/facades/ventas.facade";
import { VentasPersistenceModule } from "./infraestructure/persistence/prisma-persistence/ventas-persistence.module";
import { CreateVentaModule } from "../../processes/create-venta/create-venta.module";
import { VentasController } from "./infraestructure/presentation/controllers/ventas.controller";
import { VENTAS_APPLICATION_PORT } from "./application/ports/ventas-application.port";

@Module({
    imports: [
        // TypeOrmVentasPersistenceModule,
        VentasPersistenceModule,
        CreateVentaModule
    ],
    providers: [
        FindAllVentasUseCase,
        FindOneVentaUseCase,
        VentasFacade,
        {
            provide: VENTAS_APPLICATION_PORT,
            useClass: VentasFacade
        }
    ],
    controllers: [
        VentasController
    ],
    exports: [
        // TypeOrmVentasPersistenceModule,
        VentasPersistenceModule,
        VENTAS_APPLICATION_PORT
    ]
})
export class VentasModule {}
