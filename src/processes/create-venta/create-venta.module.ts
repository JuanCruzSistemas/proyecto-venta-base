import { Module } from "@nestjs/common";

import { CreateVentaUseCase } from "./application/use-cases/create-venta.use-case";
import { CreateVentaFacade } from "./application/facades/create-venta.facade";

import { VentasPersistenceModule } from "../../modules/ventas/infraestructure/persistence/prisma-persistence/ventas-persistence.module";
import { ProductosPersistenceModule } from "../../modules/productos/infraestructure/persistence/prisma-persistence/prisma-productos-persistence.module";
import { CREATE_VENTA_PORT } from "./application/ports/create-venta.port";

@Module({
    imports: [
        VentasPersistenceModule,
        ProductosPersistenceModule
    ],
    providers: [
        CreateVentaUseCase,
        CreateVentaFacade,
        {
            provide: CREATE_VENTA_PORT,
            useClass: CreateVentaFacade
        }
    ],
    exports: [
        CREATE_VENTA_PORT
    ]
})
export class CreateVentaModule {}
